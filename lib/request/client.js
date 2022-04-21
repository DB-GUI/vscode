let msgID = 0
const requests = {} // 存放待处理的请求

export default function Request({
  timeout = 3000,
  vscode
}) {
  if(typeof timeout != 'number')
    throw Error('"timeout" is a number')
  if(!vscode)
    throw Error('need "vscode"')
  
  return function request(name, data) {
    if(!name) throw Error('request name?')

    msgID ++
    vscode.postMessage({
      msgID, name, data
    })
    return new Promise((res, rej) => {
      requests[msgID] = {
        res,
        rej,
        timeoutID: setTimeout(() => {
          delete requests[msgID]
          rej(RequestError(1)) // 超时
        }, timeout)
      }
    })
  }
}

window.addEventListener('message', event => {
  const response = event.data
  const request = requests[response.msgID]
  delete requests[response.msgID]
  
  if(!request) // 超时 或 其他类型的消息
    return
  
  if(response.code)
    return request.rej(RequestError(response.code))

  request.res(response.data)
})

function RequestError(code) {
  return { code }
}