import { commands, ExtensionContext } from 'vscode'
import { logger } from '@/util'
import { key } from '@/constant/command'
import { Webview_wrapper } from '@/webview/oo'
import { All_state } from '@/state/oo'

export
function init_command(ext_context: ExtensionContext, state: All_state) {
  [
    {
      key: key.connection.add,
      exec(...args: any[]) {
        logger.debug('open add connection webview')
        new Webview_wrapper({ ext_context, state }, '<h1>hello</h1>')
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
