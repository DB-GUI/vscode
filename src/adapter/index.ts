import { PPz_context } from '@/main/oo'
import { Adapter } from './oo'

import mysql from './mysql'

export default
function get_adapter(ppz: PPz_context, name: string) {
  const list: Adapter<any>[] = [
    mysql,
  ].map(make_adapter => make_adapter(ppz))

  const adapter = list.find(
    adapter => name == adapter.name
  )
  if(adapter)
    return adapter
  else
    throw Error('no db adapter for ' + name)
}
