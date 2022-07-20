const collection = require('../../model/connection')
const { clone } = require('../../utils')
const connectionTreeview = require('../../view/treeview/connection')
const MysqlKnexConnection = require('./mysql')
const PostgreSQLKnexConnection = require('./pgsql')
const Sqlite3KnexConnection = require('./sqlite3')
const CockroachDB = require('./cock')

const service = module.exports = Object.create(collection)

service.connect = function(connection) {
  console.debug('connecting to', connection)
  connection = clone(connection)
  const Class = {
    mysql: MysqlKnexConnection,
    postgresql: PostgreSQLKnexConnection,
    sqlite3: Sqlite3KnexConnection,
    cockroachdb: CockroachDB,
  }[connection.client]
  if(!Class)
    throw Error('意外的连接类型 ' + connection.client)
  const result = new Class(connection)
  // 危险：connection 对象会不会变？新 connection 对象没有 clone 方法；方式太丑
  result.clone = () => new Class(connection)
  return result
}

service.upsert = async function({ record, connect }) {
  const rawId = record.id
  const id = await collection.upsert(record)
  // 插入连接，是新用户接触的第一个功能
  // 即使动态修改 treeview 节点很麻烦，也应尽量做好
  // 但其他 upsert，就要量力而行了（用户可以点击相应的刷新按钮来更新）
  if(rawId)
    connectionTreeview.tree.updateChild(collection.getByKey(id), connect)
  else
    connectionTreeview.tree.addChild(record, connect)
}
