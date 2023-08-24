export default
function make_client(get_id_request = () => '' + new Date().getTime() + Math.random()) {
  // 暂存所有请求 id_request => promise_request
  const map_request = new Map()

  // 打开监听: 后端响应消息
  window.addEventListener('message', function handle_response_receive(event) {
    const message = event.data
    const promise = map_request.get(message.id_request)
    if(promise) {
      console.debug('PPz.vscode request responded', message.id_request, message)
      if(message.code_error)
        promise.reject({
          code: message.code_error,
          msg: message.msg
        })
      else
        promise.resolve(message.data)
    }
  })
  
  const vscode = acquireVsCodeApi()
  return function request(key_handler, post) {
    return new Promise((resolve, reject) => {
      const id_request = get_id_request()
      console.debug('PPz.vscode requesting', id_request, key_handler, post)
      map_request.set(id_request, { resolve, reject })
      vscode.postMessage({
        id_request,
        key_handler,
        post,
      })
    })
  }
}
