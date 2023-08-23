import { ExtensionContext } from 'vscode'
import { logger } from './util'
import { init_command } from './command'
import { init_state } from './state'
import { init_connection_view } from './connection_view'

export
async function activate(context: ExtensionContext) {
  logger.debug('starting')
  const state = await init_state(context)
  const event_emitter_treeview = init_connection_view(state.connection)
  init_command(context, state, event_emitter_treeview)
  logger.debug('started')
}