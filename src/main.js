const { logger } = require('./util')
const init_command = require('./command')
const init_state = require('./state/init')

exports.activate = async function(context) {
  logger.debug('starting')
  init_command(context)
  const state = await init_state(context)
  logger.debug('started')
}
