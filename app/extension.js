const vscode = require('vscode')
const Webview = require('./webview')

const app = {
  activate(context) {
    console.debug('activating')
    globalThis.Context = context
  
    this.registerCommand('addConnection', () => {
      console.debug('command: addConnection')
      new Webview({
        filename: 'add-connection',
        title: '创建连接'
      })
    })
    
    console.debug('activated')
  },
  deactivate() {
    console.debug('deactivated')
  },

  registerCommand(name, handler) {
    Context.subscriptions.push(
      vscode.commands.registerCommand('ppz.' + name, handler)
    )
  }
}

exports.activate = ctx => app.activate(ctx)
exports.deactivate = () => app.deactivate()
