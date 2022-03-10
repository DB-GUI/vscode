const Webview = require('./index')
const connectionService = require('../service/connection')

module.exports = class AddConnectionWebview extends Webview {
  constructor() {
    super({
      filename: 'add-connection',
      title: '创建连接'
    })
    this.onMessage('save', function(data) {
      const id = connectionService.save(data.connection)
      if(data.connect)
        connectionService.connect(id)
    })
  }
}