import { ExtensionContext } from 'vscode'
import { All_state } from '@/main/state/oo'
import { Webview_wrapper_react } from '@/main/webview/oo'

export default (ext_context: ExtensionContext, state: All_state) =>
  new Webview_wrapper_react({ ext_context, state }, {
    title: 'upsert connection',
    name: 'connection_upsert',
  })
