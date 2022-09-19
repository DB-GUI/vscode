const { get } = require('@ppzp/context')

const v0_0 = require('./0-0-0')
const v0_4 = require('./0-4-0')

module.exports = async function() {
  const state = get().globalState
  await v0_0(state)
  await v0_4(state)
  
  const { version } = state.get('system')
  if(version !== '0.4.0') {
    console.error('数据迁移异常')
    for(let key of state.keys())
      console.error(key, state.get(key))
    throw Error('数据迁移异常')
  }
}