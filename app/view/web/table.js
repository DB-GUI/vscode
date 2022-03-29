const Webview = require('./index')
const { noty } = require('../../utils')

module.exports = class TableWebview extends Webview {
  constructor(database, table, connection) {
    super({
      filename: 'table',
      title: table
    })
    // this.onMessage('save', data => this.save(data))
  }
}