const system = require('../model/system')
const vscode = require('vscode')
const UpsertConnectionWebview = require('../webview/upsert-connection')
const Collection = require('../model/collection/index')
const { noty } = require('../utils')

function registerCommand(name, handler) {
  Context.subscriptions.push(
    vscode.commands.registerCommand('ppz.' + name, handler)
  )
}

async function init() {
  if(system.newInstall()) {
    console.log('first install')
    await system.save({
      version: '0.0.0'
    })
  }

  // 检查数据
  try {
    Collection.instances.forEach(ins => {
      const data = ins.getAllData()
      ins.validate(data)
    })
  } catch(e) {
    noty.error('数据校验失败')
    console.error(e)
  }

  const systemInfo = system.getAllData()
  console.log('system info', systemInfo)

  registerCommand('addConnection', () => {
    console.debug('command: addConnection')
    new UpsertConnectionWebview()
  })
}

module.exports = init