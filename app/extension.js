const init = require('./service/init')

exports.activate = async function(context) {
  // const keys = context.globalState.keys()
  // console.log(keys)
  // keys.forEach(key => context.globalState.update(key, undefined))
  // return
  console.debug('activating')
  globalThis.Context = context
  try {
    await init()
    console.debug('activated')
  } catch(e) {
    console.error('error on activating')
    console.error(e)
  }
}

exports.deactivate = function() {
  console.debug('deactivated')
}