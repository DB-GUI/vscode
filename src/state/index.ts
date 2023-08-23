import { ExtensionContext } from 'vscode'
import { State, State_list, All_state } from './oo'
import migrate from './migrate'

export
async function init_state(context: ExtensionContext): Promise<All_state> {
  const state = context.globalState
  await migrate(state)
  return {
    system: new State(state, 'system'),
    connection: new State_list(state, 'connection'),
  }
}
