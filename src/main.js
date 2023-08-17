const init_command = require('./command')
const init_state = require('./state/init')

exports.activate = async function(context) {
  init_command(context)
  await init_state()

}
