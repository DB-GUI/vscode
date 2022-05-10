let msgID = 0
const requests = {} // 存放待处理的请求

export default function Request({
  timeout = 6000,
  vscode,
  beforeSend,
  afterReturn
}) {
  if(typeof timeout != 'number')
    throw Error('"timeout" is a number')
  if(!vscode)
    throw Error('need "vscode"')
  
  return function request(name, data, _timeout = timeout) {
    if(!name) throw Error('request name?')
    console.debug('requesting', { name })
    if(beforeSend)
      beforeSend()

    msgID ++
    vscode.postMessage({
      msgID, name, data
    })
    return new Promise((res, rej) => {
      if(afterReturn) {
        let rawRes = res
        res = function() {
          afterReturn()
          return rawRes(...arguments)
        }
        let rawRej = rej
        rej = function() {
          afterReturn()
          return rawRej(...arguments)
        }
      }
      let currentID = msgID // 当前 msgID 保留下来
      requests[currentID] = {
        res,
        rej,
        timeoutID: _timeout && setTimeout(() => {
          delete requests[currentID] // 上面不保存“当前 id”，这里就有 bug
          rej({ code: 1, msg: '请求超时' }) // 超时
        }, _timeout)
      }
    })
  }
}

window.addEventListener('message', event => {
  console.debug('responding', event)
  const response = event.data
  const request = requests[response.msgID]
  delete requests[response.msgID]
  
  if(!request) // 超时 或 其他类型的消息
    return
  clearTimeout(request.timeoutID)

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