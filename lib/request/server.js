module.exports = function Sevlets(webview, subscriptions, handlerMap, errorHandler) {
  webview.onDidReceiveMessage(
    async ({ name, data }) => {
      const handle = handlerMap[name]
      if(!handle)
        return webview.postMessage({ code: 4 }) // 404
      try {
        const responseData = await handle(data)
        webview.postMessage({
          code: 0,
          data: responseData
        })
      } catch(err) {
        webview.postMessage({ code: 5 }) // 50x
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