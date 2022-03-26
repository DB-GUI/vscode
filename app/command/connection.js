const UpsertConnectionWebview = require('../view/web/upsert-connection')
const service = require('../service/connection')
const { noty } = require('../utils')

exports.addConnection = function() {
  new UpsertConnectionWebview()
}

exports.deleteConnection = async function(el) {
  if(el && el.type == 'connection' && el.data && el.data.id) {
    try {
      await service.drop(el.data.id)
      // todo refresh treeview
    } catch(err) {
      const msg = '连接删除时发生意外'
      console.error(msg, err)
      noty.fatal(msg)
    }
  } else {
    noty.error('请从左侧 treeview 里删除连接')
  }
}