const vscode = require('vscode')
const { noty } = require('../../../utils')
const TreeviewOptions = require('./treeview-options')
const {
  RootElement, ConnectionElement, DatabaseElement
} = require('./element')

// 根结点
const root = new RootElement()
// 更新 treeview
const updateEvent = new vscode.EventEmitter()
// treeview
exports.treeviewOptions = TreeviewOptions(root, updateEvent)

// 删除结点
exports.drop = function(el) {
  console.debug('删除结点', el)
  const siblings = el.parent.children
  siblings.splice(siblings.indexOf(el), 1)
  if(el instanceof ConnectionElement && el.connection)
    el.connection.close()
  const updateTarget = el.parent == root
    ? undefined : el.parent
  updateEvent.fire(updateTarget)
}

// 增加连接
exports.add = function(options) {
  console.debug('treeview add connection', options)
  root.children.push(new ConnectionElement(root, null, options))
  updateEvent.fire()
}

// 刷新 treeview
exports.refreshConnections = async function() {
  console.debug('connections refreshing')
  for(const conn of root.children)
    if(conn.connection)
      await conn.connection.close()
  root.children = null
  updateEvent.fire()
  console.debug('connections refreshed')
}
// 刷新 connection
exports.refreshConnection = async function(connEl) {
  console.debug('connection refreshing')
  if(!connEl) {
    noty.error('请从左侧 treeview 面板刷新连接')
    return
  }
  if(!(connEl instanceof ConnectionElement)) {
    const msg = '意外的结点类型 ' + connEl.type
    console.error(msg, Error(msg))
    noty.fatal(msg)
    return
  }
  if(connEl.connection) {
    await connEl.connection.close()
    connEl.connection = null
    connEl.children = null
    updateEvent.fire(connEl)
  } else
    console.debug('没连的，就不刷新了')
  console.debug('connection refreshed')
}
// 刷新数据库
exports.refreshDatabase = function(dbEl) {
  console.debug('database refreshing')
  if(!dbEl) {
    noty.error('请从左侧 treeview 面板刷新数据库')
    return
  }
  if(!(dbEl instanceof DatabaseElement)) {
    const msg = '意外的结点类型 ' + dbEl.type
    console.error(msg, Error(msg))
    noty.fatal(msg)
    return
  }
  dbEl.children = null
  updateEvent.fire(dbEl)
  console.debug('database refreshed')
}