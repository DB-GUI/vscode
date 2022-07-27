const vscode = require('vscode')
const connection = require('./connection')
const other = require('./other')

function registerCommand(name, handler) {
  // console.debug('注册 command', name)
  Context.subscriptions.push(
    vscode.commands.registerCommand('ppz.' + name, function() {
      console.debug('执行 command', name)
      return handler(...arguments)
    })
  )
}

module.exports = function() {
  ;[
    connection,
    other
  ]
  .flatMap(
    module => Object.entries(module)
  )
  .map(
    ([ name, handler ]) => registerCommand(name, handler)
  )
}