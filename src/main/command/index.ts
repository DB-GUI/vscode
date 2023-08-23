import { commands, ExtensionContext, EventEmitter } from 'vscode'
import { logger } from '@/main/util'
import key from '@/common/constant/key'
import open_webview_connection_upsert from '@/main/webview/all/connection_upsert'
import { All_state } from '@/main/state/oo'
import { Element } from '@/main/connection_view/oo'

export
function init_command(ext_context: ExtensionContext, state: All_state, event_emitter_treeview: EventEmitter<Element>) {
  [
    {
      key: key.command.connection.add,
      exec(...args: any[]) {
        logger.debug('open add connection webview')
        open_webview_connection_upsert(ext_context, state)
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
