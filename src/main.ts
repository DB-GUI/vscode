import { ExtensionContext } from 'vscode'
import { logger } from './util'
import init_command from './command'
import { init as init_state } from './state'

exports.activate = async function(context: ExtensionContext) {
  logger.debug('starting')
  const state = await init_state(context)
  init_command(context)
  logger.debug('started')
}
