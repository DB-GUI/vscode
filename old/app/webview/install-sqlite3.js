import Webview from './common/base'
import { get as getContext } from '@ppzp/context'

export default
class TableWebview extends Webview {
  constructor() {
    super({
      filename: 'install-sqlite3',
      title: 'install sqlite3',
      initData: {
        extPath: getContext().extensionPath
      }
    })
  }
}