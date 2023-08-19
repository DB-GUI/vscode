import { ExtensionContext } from 'vscode'
import { State, List_state, All_state } from './oo'
import migrate from './migrate'

export
async function init_state(context: ExtensionContext): Promise<All_state> {
  const state = context.globalState
  await migrate(state)
  return {
    system: new State(state, 'system'),
    connection: new List_state(state, 'connection'),
  }
}
