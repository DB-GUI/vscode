import './iconfont.js'

/** @returns {HTMLElement} */
export default function $(selector) {
  if(typeof selector == 'string')
    return document.querySelector(selector)
  return selector
}

import { El, Section, Span, Div, Icon, Button } from './el/index.js'
import Form from './el/form/index.js'
import { Table, THead, TBody } from './el/table/index.js'

$.El = El
$.Section = Section
$.Div = Div
$.Span = Span
$.Icon = Icon
$.Button = Button

$.Form = Form
$.Input = function(options) {
  const $el = $.El('input')
  for(const key in options)
    $el[key] = options[key]
  return $el
}

$.Table = Table
$.THead = THead
$.TBody = TBody

$.clone = function(data) {
  const result = {}
  for(let k in data)
    result[k] = data[k]
  return result
}

// 可优化
$.msg = function(messageType, handler) {
  window.addEventListener('message', function({ data: { type, data }}) {
    if(messageType == type) {
      console.debug('收到消息', type, data)
      handler(data)
    }
  })
}

import Loading from './loading.js'
$.loading = Loading($)

import Request, { Api } from '../../../lib/request/client.js'

const request = Request({
  vscode: VSCODE
})

$.api2 = Api(request) // 不 loading 的 request
$.api = Api({
  vscode: VSCODE,
  beforeSend: $.loading.show,
  afterReturn: $.loading.hide
})

$.noty = new Proxy({}, {
  get(target, type) {
    return (msg, btns = []) => request('noty', { type, msg, btns }, {
      timeout: 0
    })
  }
})

$.notyPrompt = new Proxy({}, {
  get(target, type) {
    return async (msg, btns) => {
      const result = await $.noty[type](msg, Object.keys(btns))
      if(result)
        btns[result]()
      return result
    }
  }
})

$.notyConfirm = new Proxy({}, {
  get(target, type) {
    return async(msg, btnTxt = '确定') =>
      btnTxt == await $.noty[type](msg, [btnTxt])
  }
})

$.notyWarn = async function(msg, btnTxt) {
  return !await $.notyConfirm.warn(msg, btnTxt)
}

import Prompt from '../../../lib/prompt/webview/client.js'
$.prompt = Prompt(request)

$.isNil = function(target) {
  if(target == null || target == undefined)
    return true
  return false
}
$.isNumber = function(target) {
  return typeof target == 'number' && !isNaN(target)
}
$.isInt = function(target) {
  return $.isNumber(target) && target % 1 == 0
}
$.isUnsignedInt = function(target) {
  return $.isInt(target) && target > 0
}

$.emptyObj = function(target) {
  for(const key in target)
    delete target[key]
}

$.getOldSetNow = new function() {
  let old = undefined
  return function(now) {
    const _old = old
    old = now
    return _old
  }
}

$.run = function(f) {
  f()
}