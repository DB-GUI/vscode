const Webview = require('./common/base')

module.exports = 
class TerminalWebview extends Webview {
  constructor(connection, initSQL) {
    console.debug('TerminalWebview constructing')
    super({
      filename: 'terminal',
      title: connection.name,
      initData: { initSQL },
      webviewServerHandlers: {
        exec: async (sql) => {
          try {
            const now = new Date()
            const rawResponse = await connection.client.raw(sql)
            return {
              time: new Date() - now,
              driveName: connection.driveName,
              rawResponse,
            }
          } catch(error) {
            return {
              driveName: connection.driveName,
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