import { PPz_context } from '@/main/oo'
import { Adapter } from '../oo'
import { Mysql_connection_config } from './oo'
import mm_treeview from './treeview'

export default
function make_mysql_adapter(ppz: PPz_context): Adapter<Mysql_connection_config> {
  return {
    make_treeview: mm_treeview(ppz),
    webview: {
      connection: {
        upsert: [
          { key: 'host', label: 'Host', type: 'string' },
          { key: 'port', label: 'Port', type: 'number' },
          { key: 'user', label: 'User', type: 'string' },
          { key: 'password', label: 'Password', type: 'string' },
          { key: 'database', label: 'Database', type: 'string' },
        ]
      }
    }
  }
}
