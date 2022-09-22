import Webview from './common/base'

export default
class TableWebview extends Webview {
  constructor() {
    super({
      filename: 'wechat',
      title: '欢迎来讨论'
    })
  }
}