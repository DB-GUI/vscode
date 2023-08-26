import { Webview } from 'vscode'
import { Received, Result, Error_handler } from './oo'

interface Logger {
  error: Function
}

export default
function make_webview_server(
  webview: Webview,
  api: [string, Function][],
  logger: Logger,
) {
  // 收集所有路由
  const map_handler = new Map<string, Function>()
  for(const [key, handler] of api)
    map_handler.set(key, handler)
  // 打开监听
  webview.onDidReceiveMessage(
    async function handle_request(message: Received<any>) {
      if(!message.request_id) // 没有 id 就认为不是一次请求，就不处理
        return
      const result: Result<any, any> = {
        request_id: message.request_id,
        code: 0
      }
      try {
        const handler = map_handler.get(message.handler_key)
        if(handler)
          result.data = await handler(message.post)
        else
          throw new Error_handler('unregistered request', 404)
      } catch(error) {
        if (error instanceof Error_handler) {
          logger.error('404', message)
          result.code = error.code
          result.msg = error.msg
        } else {
          logger.error('unknown error on handling request', error)
          result.code = 500
          result.msg = 'unknown error'
        }
      }
      webview.postMessage(result)
    }
  )
}
