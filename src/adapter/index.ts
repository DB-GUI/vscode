import { PPz_context } from '@/main/oo'
import { Adapter } from './oo'

import mysql from './mysql'

type make_adapter = (ppz: PPz_context) => Adapter<any>
interface make_adapter_map {
  adapter_name: string
  make_adapter: make_adapter
}

/**
 * 各 adapter 导出的是 make_adapter  
 * 以便随用随取，省去管理 adapter 实例的麻烦  
 */

export default
function get_adapter(ppz: PPz_context, name: string) {
  
  const make_adapter_map = list.find(item => item.adapter_name == name)
  if(make_adapter_map)
    return make_adapter_map.make_adapter(ppz)
  else
    throw Error('no db adapter for ' + name)
}
