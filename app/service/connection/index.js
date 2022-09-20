const collection = require('../../model/connection')
const clone = require('@ppzp/stupid/clone')
const connectionTreeview = require('../../treeview/connection')
const MysqlKnexConnection = require('./mysql')
const PostgreSQLKnexConnection = require('./pgsql')
const Sqlite3KnexConnection = require('./sqlite3')
const CockroachDB = require('./cock')
const MSSQLKnexConnection = require('./mssql')

const service = module.exports = Object.create(collection)

service.connect = function(connection) {
  console.debug('connecting to', connection)
  connection = clone(connection)
  // PPZ_ADAPTER
  const Class = {
    mysql: MysqlKnexConnection,
    postgresql: PostgreSQLKnexConnection,
    sqlite3: Sqlite3KnexConnection,
    cockroachdb: CockroachDB,
    mssql: MSSQLKnexConnection,
  }[connection.client]
  if(!Class)
    throw Error('意外的连接类型 ' + connection.client)
  const result = new Class(connection)
  // 危险：connection 对象会不会变？新 connection 对象没有 clone 方法；方式太丑
  result.clone = () => new Class(connection)
  return result
}

service.upsert = async function({ record, connect }) {
  const rawId = record._id
  const id = await collection.upsert(record)
  const options = collection.findById(id)
  if(rawId)
    connectionTreeview.updateConnection(options, connect)
  else
    connectionTreeview.addConnection(options, connect)
}
