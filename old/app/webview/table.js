import Webview from './common/base'
import noty from '../../lib/vscode-utils/noty'
import { TableElement } from '../treeview/connection/element/base'
import NewRecordWebview from './new-record'
import { get as getContext } from '@ppzp/context'
import vscode, { l10n } from 'vscode'
import makeOpenTerminal from './common/open-terminal'

class TableWebview extends Webview {
  constructor(schemaName, tableName, names, connection) {
    console.debug('TableWebview constructing', names)
    console.debug('l10n.uri:',vscode.l10n.uri)
    super({
      filename: 'table',
      title: tableName,
      connection,
      initData: {
        names
      },
      webviewServerHandlers: {
        ...makeOpenTerminal(connection.clone()),
        async getData({ params, sort }) {
          params.sort = sort
          const fields = await connection.fieldList(schemaName, tableName)
          const { records, count } = await connection.select(schemaName, tableName, params)
          return { fields, records, count }
        },
        checkSQL({ params, sort }) {
          params.sort = sort
          return {
            sql: connection.selectSQL(schemaName, tableName, params)
          }
        },
        async update(editing) {
          try {
            await connection.updateMany(schemaName, tableName, editing)
            noty.info(vscode.l10n.t('Saved'))
            return true
          } catch(err) {
            noty.fatal(err.toString())
            return false
          }
        },
        async drop(pkValues) {
          try {
            await connection.drop(schemaName, tableName, pkValues)
            noty.info(vscode.l10n.t('Deleted'))
            return true
          } catch(err) {
            noty.fatal(err.toString())
            return false
          }
        },
        newRecord(data) {
          new NewRecordWebview(schemaName, tableName, connection, data)
        }
      }
    })
  }
}

const map = new Map()

export default
function openTableWebview(tableEl) {
  if(!(tableEl instanceof TableElement))
    throw Error('cant create a TableWebview from a non-TableElement')
  
  if(map.has(tableEl)) {
    console.debug('[openTableWebview] reveal tableWebview')
    map.get(tableEl).panel.reveal()
    return
  }

  console.debug('[openTableWebview] create tableWebview')
  const view = new TableWebview(tableEl.schemaName, tableEl.name, tableEl.names, tableEl.connection)
  map.set(tableEl, view)
  view.panel.onDidDispose(() => {
    map.delete(tableEl)
  }, null, getContext().subscriptions)
}
