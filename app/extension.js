import { set as setContext } from '@ppzp/context'
import initState from './model/migration/index.js'
import initCommand from './command/index.js'
import initTreeview from './treeview/index.js'

export
async function activate(context) {
  // console.log('[ppz extension path]', context.extensionPath)
  setContext(context)
  
  try {
    // 注册命令
    initCommand()
    // 数据迁移
    await initState()
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
