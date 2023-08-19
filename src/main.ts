import { ExtensionContext, commands } from 'vscode'
import { logger } from './util'
import list_command from './command/all'
import { State, List_state, All_state } from './state/oo'
import migrate from './state/migrate'

export
async function activate(context: ExtensionContext) {
  logger.debug('starting')
  const state = await init_state(context)
  init_command()
  logger.debug('started')
}

function init_command() {
  list_command.forEach(command => {
    commands.registerCommand(command.register.command, command.exec)
  })
}

async function init_state(context: ExtensionContext): Promise<All_state> {
  const state = context.globalState
  await migrate(state)
  return {
    system: new State(state, 'system'),
    connection: new List_state(state, 'connection'),
  }
}
