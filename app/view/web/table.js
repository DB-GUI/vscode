const Webview = require('./common/base')
const noty = require('../../../lib/vscode-utils/noty')
const { TableElement } = require('../treeview/connection/tree/base')
const NewRecordWebview = require('./new-record')
const formatDate = require('../../utils').formatDate

class TableWebview extends Webview {
  constructor(schemaName, tableName, names, connection) {
    console.debug('TableWebview constructing', names)
    super({
      filename: 'table',
      title: tableName,
      initData: {
        names
      },
      webviewServerHandlers: {
        async getData(params) {
          const fields = await connection.fieldList(schemaName, tableName)
          const { records, count } = await connection.select(schemaName, tableName, params)
          for(let record of records)
            for(let f of fields)
              if(f.ppzType == 'datetime' && record[f.name])
                record[f.name] = formatDate(record[f.name])
          return { fields, records, count }
        },
        async update(editing) {
          try {
            await connection.updateMany(schemaName, tableName, editing)
            noty.info('已保存')
            return true
          } catch(err) {
            noty.fatal(err.toString())
            return false
          }
        },
        async drop(pkValues) {
          try {
            await connection.drop(schemaName, tableName, pkValues)
            noty.info('已删除')
            return true
          } catch(err) {
            noty.fatal(err.toString())
            return false
          }
        },
        newRecord(data) {
          new NewRecordWebview(schemaName, tableName, connection, data)
        },
        openTerminal() {
          connection.terminal()
        }
      }
    })
  }
}

const map = new Map()

module.exports = function openTableWebview(tableEl) {
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
  }, null, Context.subscriptions)
}