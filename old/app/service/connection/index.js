import clone from '@ppzp/stupid/clone'

import collection from '../../model/connection.js'
import connectionTreeview from '../../treeview/connection/index.js'
import MysqlKnexConnection from './adapter/mysql'
import PostgreSQLKnexConnection from './adapter/pgsql'
import Sqlite3KnexConnection from './adapter/sqlite3'
import CockroachDB from './adapter/cock'
import MSSQLKnexConnection from './adapter/mssql'

const service = Object.create(collection)

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

export default service