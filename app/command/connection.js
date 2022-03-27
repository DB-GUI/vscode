const UpsertConnectionWebview = require('../view/web/upsert-connection')
const service = require('../service/connection')
const { noty } = require('../utils')
const connectionTreeview = require('../view/treeview/connection')

exports.addConnection = function() {
  new UpsertConnectionWebview()
}

exports.deleteConnection = async function(el) {
  if(el && el.type == 'connection' && el.options && el.options.id) {
    try {
      await service.drop(el.options.id) // 从数据库删除
      connectionTreeview.delete(el) // 更新 treeview
    } catch(err) {
      const msg = '连接删除时发生意外'
      console.error(msg, err)
      noty.fatal(msg)
    }
  } else {
    noty.error('请从左侧 treeview 里删除连接')
  }
}