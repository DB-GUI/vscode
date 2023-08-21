import { commands, ExtensionContext } from 'vscode'
import { logger } from '@/util'
import { key } from '@/constant/command'
import { Webview_wrapper_react } from '@/webview/oo'
import { All_state } from '@/state/oo'

export
function init_command(ext_context: ExtensionContext, state: All_state) {
  [
    {
      key: key.connection.add,
      exec(...args: any[]) {
        logger.debug('open add connection webview')
        new Webview_wrapper_react({ ext_context, state }, {
          title: 'upsert connection',
          name: 'connection_upsert'
        })
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
