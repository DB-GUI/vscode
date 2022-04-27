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
      let currentID = msgID // 当前 msgID 保留下来
      requests[currentID] = {
        res,
        rej,
        timeoutID: setTimeout(() => {
          delete requests[currentID] // 上面不保存“当前 id”，这里就有 bug
          rej({ code: 1 }) // 超时
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
    return request.rej(response)

  request.res(response.data)
})

export function Api(request) {
  return new Proxy({}, {
    get(target, api) {
      return data => request(api, data)
    }
  })
}