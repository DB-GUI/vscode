const Webview = require('./common/base')

module.exports = 
class TerminalWebview extends Webview {
  constructor(connection) {
    console.debug('TerminalWebview constructing')
    super({
      filename: 'terminal',
      title: connection.name,
      webviewServerHandlers: {
        exec: async (sql) => {
          try {
            const now = new Date()
            const rawResponse = await connection.client.raw(sql)
            return {
              time: new Date() - now,
              clientType: connection.clientType,
              rawResponse,
            }
          } catch(error) {
            return {
              clientType: connection.clientType,
              error: true,
              rawError: error,
              errString: error.toString()
            }
          }
        }
      }
    })
  }
}