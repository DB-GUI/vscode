const system = require('../model/system')
const vscode = require('vscode')
const UpsertConnectionWebview = require('../view/web/upsert-connection')
const Collection = require('../model/collection/index')
const initTreeview = require('../view/treeview')
const { noty } = require('../utils')

function registerCommand(name, handler) {
  Context.subscriptions.push(
    vscode.commands.registerCommand('ppz.' + name, handler)
  )
}

async function init() {
  // 注册命令：清空数据
  registerCommand('empty', async () => {
    const keys = Context.globalState.keys()
    await Promise.all(
      keys.map(key =>
        Context.globalState.update(key, undefined)
      )
    )
    noty.info('数据已清空，请重启 vscode')
  })

  if(system.newInstall()) {
    console.log('first install')
    await system.save({
      version: '0.0.0'
    })
  }
  
  // 检查数据
  Collection.instances.forEach(ins => {
    const data = ins.getAllData()
    try {
      ins.validate(data)
    } catch(e) {
      noty.error('数据校验失败')
      console.error('数据校验失败', data)
      throw e
    }
  })

  const systemInfo = system.getAllData()
  console.log('system info', systemInfo)

  initTreeview()
  
  registerCommand('addConnection', () => {
    console.debug('command: addConnection')
    new UpsertConnectionWebview()
  })
}

module.exports = init