import { get } from '@ppzp/context'

import v0_0 from './0-0-0'
import v0_5 from './0-5-0'

export default
async function() {
  const state = get().globalState
  await v0_0(state)
  await v0_5(state)
  
  const { version } = state.get('system')
  if(version !== '0.5.0') {
    console.error('数据迁移异常')
    for(let key of state.keys())
      console.error(key, state.get(key))
    throw Error('数据迁移异常')
  }
}