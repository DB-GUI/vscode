const system = require('../model/system')
const vscode = require('vscode')
const UpsertConnectionWebview = require('../webview/upsert-connection')

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
  const systemInfo = system.getAllData()
  console.log('system info', systemInfo)

  registerCommand('addConnection', () => {
    console.debug('command: addConnection')
    new UpsertConnectionWebview()
  })
}

module.exports = init