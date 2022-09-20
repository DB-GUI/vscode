const Webview = require('./common/base')

module.exports = 
class TableWebview extends Webview {
  constructor() {
    super({
      filename: 'feifei',
      title: '大明星'
    })
  }
}