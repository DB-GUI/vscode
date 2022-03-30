const Webview = require('./index')
const { noty } = require('../../utils')

module.exports = class TableWebview extends Webview {
  constructor(databaseName, tableName, connection) {
    console.debug('TableWebview constructing', databaseName, tableName)
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
    this.fields = await this.connection.fieldList(this.databaseName, this.tableName)
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