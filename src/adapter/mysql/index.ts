import { PPz_context } from '@/main/oo'
import mm_treeview from './treeview'
import { Adapter } from '../oo'

export default
function make_mysql_adapter(ppz: PPz_context): Adapter {
  return {
    name: 'mysql',
    make_treeview: mm_treeview(ppz),
  }
}
