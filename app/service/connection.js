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
    default:
      throw Error('意外的连接类型 ' + connection.client)
  }
}

service.upsert = async function(record) {
  const rawId = record.id
  const id = await collection.upsert(record)
  if(rawId)
    console.error('todo edit')
  else
    connectionTreeview.addConnection(collection.getByKey(id))
}

class KnexConnection {
  constructor(clientType, connection) {
    this.clientType = clientType
    this.client = Knex({
      client: clientType,
      connection,
      acquireConnectionTimeout: 10000,
      pool: { min: 0, max: 1 }
    })
  }
  
  async dbList() {
    throw Error('未实现 dbList 函数')
  }

  async tbList() {
    throw Error('未实现 tbList 函数')
  }

  async close() {
    console.debug('connection closing...')
    await this.client.destroy()
    console.debug('connection closed')
  }
}

class MysqlKnexConnection extends KnexConnection {
  constructor({ host, port, user, password, database }) {
    super('mysql2', {
      host, port, user, password, database
    })
  }

  async dbList() {
    const result = await this.client.raw('show databases;')
    return result[0].map(item => item.Database)
  }
  
  async tbList(database) {
    await this.client.raw('use ' + database)
    const result = await this.client.raw('show tables;')
    return result[0].map(item => item['Tables_in_' + database])
  }
}