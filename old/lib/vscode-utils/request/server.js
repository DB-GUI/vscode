class SevletError {
  constructor(code, error) {
    this.code = code
    this.error = error
  }
  set(msgID, name) {
    this.msgID = msgID
    this.name = name
    return this
  }
}

function Sevlets(webview, subscriptions, handlerMap, errorHandler) {
  webview.onDidReceiveMessage(
    async ({ msgID, name, data }) => {
      if(!msgID) // 其他消息
        return
      const handle = handlerMap[name]
      if(!handle) // 404
        return webview.postMessage({ name, msgID, code: 4 })
      try {
        const responseData = await handle(data)
        webview.postMessage(responseData instanceof SevletError
          ? responseData.set(msgID, name)
          : {
            code: 0,
            msgID,
            name,
            data: responseData
          })
      } catch(err) {
        webview.postMessage({ name, msgID, code: 5 }) // 50x
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

Sevlets.Error = function(code, error) {
  return new SevletError(code, error)
}

module.exports = Sevlets