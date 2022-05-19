const collection = require('../../model/connection')
const { clone } = require('../../utils')
const connectionTreeview = require('../../view/treeview/connection')
const { MysqlKnexConnection, Sqlite3KnexConnection } = require('./knex-connection')

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

service.terminal = function(options) {
  
}
