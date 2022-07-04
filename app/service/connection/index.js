const collection = require('../../model/connection')
const { clone } = require('../../utils')
const connectionTreeview = require('../../view/treeview/connection')
const MysqlKnexConnection = require('./mysql')
const PostgreSQLKnexConnection = require('./pgsql')
const Sqlite3KnexConnection = require('./sqlite3')

const service = module.exports = Object.create(collection)

service.connect = function(connection) {
  console.debug('connecting to', connection)
  connection = clone(connection)
  switch(connection.client) {
    case 'mysql':
      return new MysqlKnexConnection(connection)
    case 'postgresql':
      return new PostgreSQLKnexConnection(connection)
    case 'sqlite3':
      return new Sqlite3KnexConnection(connection)
    default:
      throw Error('意外的连接类型 ' + connection.client)
  }
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
