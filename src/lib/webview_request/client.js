export default
function make_client(get_request_id = () => '' + new Date().getTime() + Math.random()) {
  // 暂存所有请求 request_id => request_promise
  const request_map = new Map()

  // 打开监听: 后端响应消息
  window.addEventListener('message', function handle_response_receive(event) {
    const message = event.data
    const promise = request_map.get(message.request_id)
    if(promise) {
      console.debug('PPz.vscode request responded', message.request_id, message)
      if(message.code)
        promise.reject({
          code: message.code,
          msg: message.msg
        })
      else
        promise.resolve(message.data)
    }
  })
  
  const vscode = acquireVsCodeApi()
  return function request(handler_key, post) {
    return new Promise((resolve, reject) => {
      const request_id = get_request_id()
      console.debug('PPz.vscode requesting', request_id, handler_key, post)
      request_map.set(request_id, { resolve, reject })
      vscode.postMessage({
        request_id,
        handler_key,
        post,
      })
    })
  }
}
