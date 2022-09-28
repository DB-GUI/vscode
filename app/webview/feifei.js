import Webview from './common/base'

export default
class TableWebview extends Webview {
  constructor() {
    super({
      filename: 'feifei',
      title: '大明星'
    })
  }
}