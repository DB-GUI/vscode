import { commands, EventEmitter } from 'vscode'
import { logger } from '@/main/util'
import key from '@/common/constant/key'
import { All_state } from '@/main/state/oo'
import { Element } from '@/main/connection_view/oo'
import make_upsert_connection_webview from '@/main/webview/all/upsert_connection'
import { PPz_context } from '../oo'

export
function init_command(
  ppz: PPz_context,
  state: All_state,
  event_emitter_treeview: EventEmitter<Element>,
) {
  [
    {
      key: key.command.connection.add,
      exec(...args: any[]) {
        logger.debug('open add connection webview')
        make_upsert_connection_webview(ppz)
      }
    }
  ].forEach(({ key, exec }) => {
    commands.registerCommand(key, async (...args) => {
      logger.debug('executing command', key, { args })
      try {
        await exec(...args)
      } catch (err) {
        logger.error(err)
      }
    })
  })
}
