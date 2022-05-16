const Webview = require('./common/base')
const { noty } = require('../../utils')

module.exports = 
class TableWebview extends Webview {
  constructor(database, table, connection, data) {
    console.debug('NewRecordWebview constructing', { database, table })
    super({
      filename: 'new-record',
      initData: {
        data
      },
      webviewServerHandlers: {
        insert: async ({ record, closeAfterInserted }) => {
          try {
            await connection.insert(database, table, record)
            noty.info('已保存')
            if(closeAfterInserted)
              this.dispose()
            return true
          } catch(err) {
            noty.error(err.toString())
            return false
          }
        }
      }
    })
  }
}