const Webview = require('./common/base')
const { noty } = require('../../utils')
const TableTreeviewElement = require('../treeview/connection/element').TableElement

class TableWebview extends Webview {
  constructor(databaseName, tableName, connection) {
    console.debug('TableWebview constructing', { databaseName, tableName })
    super({
      filename: 'table',
      title: tableName
    })
    this.databaseName = databaseName
    this.tableName = tableName
    this.connection = connection
    this.loadFieldsAndData()
    this.onMessage('select', params => this.putData(params))
    console.debug('TableWebview constructed')
  }

  getInitData() {
    return {
      connection: this.connection.name,
      database: this.databaseName,
      table: this.tableName,
      connectionOptions: this.connection.options
    }
  }
  
  async refresh() {
    await this.loadFieldsAndData()
    noty.info('数据已刷新')
  }

  async loadFieldsAndData() {
    this.fields = await this.connection.fieldList(this.tableName, this.databaseName, )
    this.sendMessage('fields', this.fields)
    await this.loadData()
  }

  async loadData(params = {
    fields: this.fields.map(field => field.name)
  }) {
    const data = await this.connection.select(this.databaseName, this.tableName, params)
    this.sendMessage('data', data)
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