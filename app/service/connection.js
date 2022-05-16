const Knex = require('knex')
const collection = require('../model/connection')
const { clone } = require('../utils')
const connectionTreeview = require('../view/treeview/connection')

const service = module.exports = Object.create(collection)

service.connect = function(connection) {
  console.debug('connecting to', connection)
  connection = clone(connection)
  switch(connection.client) {
    case 'mysql':
      return new MysqlKnexConnection(connection)
    case 'sqlite3':
      return new Sqlite3KnexConnection(connection)
    default:
      throw Error('意外的连接类型 ' + connection.client)
  }
}

service.upsert = async function({ record, connect }) {
  const rawId = record.id
  const id = await collection.upsert(record)
  if(rawId)
    connectionTreeview.updateConnection(record, connect)
  else
    connectionTreeview.add(collection.getByKey(id), connect)
}

class KnexConnection {
  constructor(clientType, name, connection, useNullAsDefault) {
    this.clientType = clientType
    this.name = name
    this.options = connection
    this.client = Knex({
      client: clientType,
      connection,
      useNullAsDefault,
      acquireConnectionTimeout: 10000,
      pool: { min: 0, max: 1 }
    })
  }
  
  async select(database, table, { pagination, fields = ['*'], }) {
    console.debug('sql select', { database, table })
    const records = await this.queryBuilder(database, table)
      .select(...fields)
      .offset((pagination.index - 1) * pagination.size).limit(pagination.size)
    const count = await this.queryBuilder(database, table).count()
    return {
      records,
      count: count[0]['count(*)']
    }
  }

  async insert(db, tb, record) {
    return await this.queryBuilder(db, tb).insert(record)
  }

  queryBuilder(database, table) {
    if(database)
      table = database + '.' + table
    return this.client.from(table)
  }

  async updateMany(db, tb, changedList) {
    const table = db? db + '.' + tb : tb
    return await this.client.transaction(trx =>
      Promise.all(changedList.map(
        item => trx(table).where(item.pk).update(item.changed)
      ))
    )
  }

  async drop(db, tb, where) {
    if(Object.keys(where).length == 0)
      throw Error('deleting all data?')
    return this.queryBuilder(db, tb).where(where).del()
  }

  async close() {
    console.debug('connection closing...')
    await this.client.destroy()
    console.debug('connection closed')
  }

  async dbList() {
    const result = await this.client.raw('show databases;')
    return result[0].map(item => item.Database)
  }
  
  async tbList(database) {
    await this.client.raw('use `' + database + '`')
    const result = await this.client.raw('show tables;')
    return result[0].map(item => item['Tables_in_' + database])
  }

  async fieldList(table, database) {
    const result = await this.client.raw(`desc \`${database}\`.\`${table}\``)
    return result[0].map(field => ({
      name: field.Field,
      type: field.Type,
      notNull: field.Null == 'NO',
      default: field.Default,
      pk: field.Key == 'PRI'
    }))
  }
}

class MysqlKnexConnection extends KnexConnection {
  constructor({ name, host, port, user, password, database }) {
    super('mysql2', name, {
      host, port, user, password, database
    })
  }
}

class Sqlite3KnexConnection extends KnexConnection {
  constructor({ name, filename }) {
    super('sqlite3', name, { filename }, true)
  }
  
  async tbList() {
    return (await this.client.raw('Pragma table_list'))
      .filter(tb => tb.type == 'table' && tb.schema == 'main' && tb.name.indexOf('sqlite_') != 0)
      .map(tb => tb.name)
  }

  async fieldList(name) {
    return (await this.client.raw(`Pragma table_info(\`${name}\`)`))
      .map(field => ({
        name: field.name,
        type: field.Type,
        notNull: Boolean(field.notnull),
        default: field.dflt_value,
        pk: Boolean(field.pk)
      }))
  }
}