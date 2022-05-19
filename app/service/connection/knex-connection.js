const Knex = require('knex')

class KnexConnection {
  constructor(clientName, knexClient, name, connection, useNullAsDefault) {
    this.clientName = clientName
    this.clientType = knexClient
    this.name = name
    this.options = connection
    this.client = Knex({
      client: knexClient,
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

exports.MysqlKnexConnection =
class MysqlKnexConnection extends KnexConnection {
  constructor({ name, host, port, user, password, database }) {
    super('mysql', 'mysql2', name, {
      host, port, user, password, database
    })
  }
}

exports.Sqlite3KnexConnection =
class Sqlite3KnexConnection extends KnexConnection {
  constructor({ name, filename }) {
    super('sqlite3', 'sqlite3', name, { filename }, true)
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