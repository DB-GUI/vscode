const vscode = require('vscode')
const { noty } = require('../../utils')

module.exports = function(options) {
  try {
    const terminal = vscode.window.createTerminal()
    terminal.sendText({
      mysql: `mysql -u${options.user} -p${options.password}`,
      sqlite3: `sqlite3 ${options.filename}`
    }[options.client])
    terminal.show()
  } catch(err) {
    noty.fatal(err.toString())
  }
}