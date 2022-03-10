const Webview = require('./index')

module.exports = class AddConnectionWebview extends Webview {
  constructor() {
    super({
      filename: 'add-connection',
      title: '创建连接'
    })
    this.onMessage('save', function(data) {
      console.log('saving', data)
    })
    this.onMessage('connect', function(data) {
      console.log('connecting', data)
    })
  }
}