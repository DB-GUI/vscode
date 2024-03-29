import { PPz_context } from '@/main/oo'
import { Adapter } from '../oo'
import { Mysql_connection_config } from './oo'
import mm_treeview from './treeview'

export default
function make_mysql_adapter(ppz: PPz_context): Adapter<Mysql_connection_config> {
  return {
    name: 'mysql',
    make_treeview: mm_treeview(ppz),
    
  }
}
