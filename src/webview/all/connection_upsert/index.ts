import { ExtensionContext } from 'vscode'
import { All_state } from 'src/state/oo'
import { Webview_wrapper_react } from 'src/webview/oo'

export default (ext_context: ExtensionContext, state: All_state) =>
  new Webview_wrapper_react({ ext_context, state }, {
    title: 'upsert connection',
    name: 'connection_upsert',
  })
