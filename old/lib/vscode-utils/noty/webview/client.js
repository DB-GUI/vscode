import request from '../../request.js'

export
const noty = new Proxy({}, {
  get(target, type) {
    return (msg, btns = []) => request('noty', { type, msg, btns }, {
      timeout: 0
    })
  }
})

export
const notyPrompt = new Proxy(noty, {
  get(noty, type) {
    return async (msg, btns) => {
      const result = await noty[type](msg, Object.keys(btns))
      if(result)
        btns[result]()
      return result
    }
  }
})

export
const notyConfirm = new Proxy(noty, {
  get(noty, type) {
    return async(msg, btnTxt = '确定') =>
      btnTxt == await noty[type](msg, [btnTxt])
  }
})

export
const notyWarn = async function(msg, btnTxt) {
  return !await notyConfirm.warn(msg, btnTxt)
}