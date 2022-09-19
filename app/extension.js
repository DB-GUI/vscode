const { set: setContext } = require('@ppzp/context')
const initCommand = require('./command')
const initState = require('./service/migration')
const initTreeview = require('./view/treeview')

exports.activate = async function(context) {
  setContext(context)
  
  try {
    // 数据迁移
    await initState()
    // 注册命令
    initCommand()
    // 左侧的 treeview
    initTreeview()
  } catch(e) {
    console.error('error on activating')
    console.error(e)
  }

  // 未捕获的异常们
  process.on('uncaughtException', error => {
    console.error('uncaughtException')
    console.error(error)
  })
  process.on('unhandledRejection', error => {
    console.error('unhandledRejection')
    console.error(error)
  })
}
