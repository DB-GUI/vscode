const vscode = require('vscode')
const noty = require('../../../../lib/vscode-utils/noty')
const { Tree } = require('./tree')

// 根结点
const root = new Tree()
// 更新 treeview
const updateEvent = new vscode.EventEmitter()
// treeview
exports.treeviewOptions = {
  showCollapseAll: true,
  treeDataProvider: {
    onDidChangeTreeData: updateEvent.event,
    getChildren(el = root) {
      return el.getChildren()
    },
    getTreeItem(el) {
      return el.getTreeItem()
    }
  }
}

// 删除结点
exports.drop = function(el) {
  console.debug('删除结点', el.clientType)
  const siblings = el.parent.children
  siblings.splice(siblings.indexOf(el), 1)
  if(el instanceof ConnectionElement && el.connection)
    el.connection.close()
  const updateTarget = el.parent == root
    ? undefined : el.parent
  updateEvent.fire(updateTarget)
}

// 增加连接
exports.add = function(options, connect) {
  console.debug('treeview add connection', options)
  root.children.push(new ConnectionElement(root, null, options, connect))
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
    await connEl.connection.close() // 关闭连接
    connEl.connection = null // 丢掉连接
    connEl.children = null // 抛弃子节点
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

// 更新 connection
exports.updateConnection = async function(record, connect) {
  for(const el of ConnectionElement.instance)
    if(el.options.id == record.id) {
      el.updateOptions(record, connect)
      if(el.connection) {
        // 把已连接的关上
        await el.connection.close() // 关闭连接
        el.connection = null // 丢掉连接
        el.children = null // 抛弃子节点
      }
      updateEvent.fire(el) // 好像是：如果 treeItem 不改动，就会更新 children（发生连接行为）
    }
}