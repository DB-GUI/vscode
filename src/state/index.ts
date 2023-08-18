import { ExtensionContext } from 'vscode'
import migrate from './migrate'
import { State, List_state, All_state } from './oo'

export
async function init(context: ExtensionContext): Promise<All_state> {
  const state = context.globalState
  await migrate(state)
  return {
    system: new State(state, 'system'),
    connection: new List_state(state, 'connection'),
  }
}
