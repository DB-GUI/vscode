import Webview from './common/base'
import noty from '../../lib/vscode-utils/noty'
import vscode from 'vscode'

export default
class TableWebview extends Webview {
  constructor(database, table, connection, data) {
    console.debug('NewRecordWebview constructing', { database, table })
    super({
      filename: 'new-record',
      title: table +" "+ vscode.l10n.t('New record'),
      initData: {
        data
      },
      webviewServerHandlers: {
        insert: async ({ record, closeAfterInserted }) => {
          try {
            await connection.insert(database, table, record)
            noty.info(vscode.l10n.t('Saved'))
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