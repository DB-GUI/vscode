import { set as setContext } from '@ppzp/context'
import initCommand from './command/index.js'
import initState from './model/migration/index.js'
import copyDependencies from './service/dependency/copy'
import initTreeview from './treeview/index.js'
import vscode from 'vscode'

export
async function activate(context: vscode.ExtensionContext) {
  // console.log('[ppz extension path]', context.extensionPath)
  setContext(context)
  
  try {
    // 注册命令
    initCommand()
    // 数据迁移
    await initState()
    // copy 老版本的 dependencies
    await copyDependencies()
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
