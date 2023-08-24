import { ExtensionContext } from 'vscode'
import { State_list, Config_connection } from '@/main/state/oo'
import { Webview_wrapper_react } from '@/main/webview/oo'

export default
function create_webview(context: ExtensionContext, state: State_list<Config_connection>) {
  new Webview_wrapper_react(
    context,
    {
      title: 'upsert connection',
      name: 'connection_upsert',
    }
  )
}
