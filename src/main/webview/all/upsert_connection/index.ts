import { ExtensionContext } from 'vscode'
import { make_webview } from '../../base'

export default
function make_upsert_connection_webview(context: ExtensionContext) {
  make_webview(context, {
    title: 'upsert connection',
    name: 'upsert_connection',
  })
}
