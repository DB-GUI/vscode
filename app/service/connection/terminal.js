const vscode = require('vscode')
const { noty } = require('../../utils')

module.exports = function(options) {
  try {
    console.debug('opening terminal', options)
    const terminal = vscode.window.createTerminal()
    const command = {
      mysql: `mysql -h${options.host}${
        options.port ? ':' + options.port : ''
      } -u${options.user} -p${options.password}`,
      sqlite3: `sqlite3 ${options.filename}`
    }[options.client]
    if(!command)
      throw Error('unsupported client, ' + options.client)
    terminal.sendText(command)
    terminal.show()
  } catch(err) {
    noty.fatal(err.toString())
  }
}