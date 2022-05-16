const Webview = require('./common/base')
const { noty } = require('../../utils')
const TableTreeviewElement = require('../treeview/connection/element').TableElement
const NewRecordWebview = require('./new-record')

class TableWebview extends Webview {
  constructor(database, table, connection) {
    console.debug('TableWebview constructing', { database, table })
    super({
      filename: 'table',
      title: table,
      initData: {
        connection: connection.name,
        database,
        table,
        connectionOptions: connection.options
      },
      webviewServerHandlers: {
        async getData(params) {
          const fields = await connection.fieldList(table, database)
          const { records, count } = await connection.select(database, table, params)
          return { fields, records, count }
        },
        async update(editing) {
          try {
            await connection.updateMany(database, table, editing)
            noty.info('已保存')
            return true
          } catch(err) {
            noty.fatal(err.toString())
            return false
          }
        },
        async drop(pkValues) {
          try {
            await connection.drop(database, table, pkValues)
            noty.info('已删除')
            return true
          } catch(err) {
            noty.fatal(err.toString())
            return false
          }
        },
        newRecord() {
          const view = new NewRecordWebview(database, table, connection)
          return new Promise(res =>
            view.onCreated(() => res(true))
          )
        }
      }
    })
  }
}

const map = new Map()

module.exports = function openTableWebview(tableEl) {
  if(!(tableEl instanceof TableTreeviewElement))
    throw Error('cant create a TableWebview from a non-TableTreeviewElement')
  
  if(map.has(tableEl)) {
    console.debug('[openTableWebview] reveal tableWebview')
    map.get(tableEl).panel.reveal()
    return
  }

  console.debug('[openTableWebview] create tableWebview')
  const view = new TableWebview(tableEl.parent.name, tableEl.name, tableEl.connection)
  map.set(tableEl, view)
  view.panel.onDidDispose(() => {
    map.delete(tableEl)
  }, null, Context.subscriptions)
}