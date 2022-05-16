const UpsertConnectionWebview = require('../view/web/upsert-connection')
const { ConnectionElement } = require('../view/treeview/connection/element')
const openTableWebview = require('../view/web/table')
const service = require('../service/connection')
const { noty, warn } = require('../utils')
const connectionTreeview = require('../view/treeview/connection')

exports.openTable = openTableWebview

exports.addConnection = function() {
  new UpsertConnectionWebview()
}

exports.refreshConnections = connectionTreeview.refreshConnections
exports.refreshConnection = connectionTreeview.refreshConnection
exports.refreshDatabase = connectionTreeview.refreshDatabase

exports.editConnection = function(el) {
  if(el instanceof ConnectionElement)
    new UpsertConnectionWebview(el.options)
  else
    noty.error('请从左侧 treeview 里选择并更新连接')
}

exports.terminal = function(el) {
  if(el instanceof ConnectionElement)
    service.terminal(el.options)
  else
    noty.error('请从左侧 treeview 里选择并打开交互模式')
}

exports.deleteConnection = async function(el) {
  if(await warn('确定删除？')) return
  
  if(el instanceof ConnectionElement) {
    try {
      await service.drop(el.options.id) // 从数据库删除
      connectionTreeview.drop(el) // 更新 treeview
    } catch(err) {
      const msg = '连接删除时发生意外'
      console.error(msg, err)
      noty.fatal(msg)
    }
  } else {
    noty.error('请从左侧 treeview 里删除连接')
  }
}