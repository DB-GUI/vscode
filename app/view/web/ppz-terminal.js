const Webview = require('./common/base')
const noty = require('../../../lib/vscode-utils/noty')

module.exports = 
class TerminalWebview extends Webview {
  constructor(connection) {
    console.debug('TerminalWebview constructing')
    super({
      filename: 'terminal',
      title: connection.name + ' Terminal',
      webviewServerHandlers: {
        exec: async (sql) => {
          return connection.client.raw(sql)
        }
      }
    })
  }
}