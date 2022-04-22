module.exports = function Sevlets(webview, subscriptions, handlerMap, errorHandler) {
  webview.onDidReceiveMessage(
    async ({ msgID, name, data }) => {
      if(!msgID) // 其他消息
        return
      const handle = handlerMap[name]
      if(!handle) // 404
        return webview.postMessage({ msgID, code: 4 })
      try {
        const responseData = await handle(data)
        webview.postMessage({
          code: 0,
          msgID,
          data: responseData
        })
      } catch(err) {
        webview.postMessage({ msgID, code: 5 }) // 50x
        if(errorHandler)
          errorHandler(err)
        else
          console.error('[@ppzp/request.vscode] server side: internal error', err)
      }
    },
    undefined,
    subscriptions
  )

  return handlerMap
}