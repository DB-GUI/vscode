import get_adapter from '@/adapter'
import { make_webview } from '../../base'
import { PPz_context } from '@/main/oo'

export default
function make_upsert_connection_webview(ppz: PPz_context) {
  make_webview(ppz.context, {
    title: 'upsert connection',
    name: 'upsert_connection',
    handler: {
      get_field_list(adapter_name: string) {
        return get_adapter(ppz, adapter_name).webview.connection.upsert.form
      }
    }
  })
}
