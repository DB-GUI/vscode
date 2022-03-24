const init = require('./service/init')

exports.activate = async function(context) {
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