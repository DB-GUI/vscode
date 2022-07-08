import { getComputed, config, writeStyle } from '../../../lib/computed-css/index.js'
import loading from './loading.js'
import { Api } from '../../../lib/vscode-utils/request/client.js'
import request from '../../../lib/vscode-utils/request.js'
import prompt from '../../../lib/vscode-utils/prompt/webview/client.js'
import { noty, notyConfirm, notyPrompt, notyWarn } from '../../../lib/vscode-utils/noty/webview/client.js'

putComputedColor()

// 应保持页面代码量少，不添加类 Composition Api 特性
export default class Page {
  constructor() {
    this.loading = loading

    this.api2 = Api(request) // 不 loading 的 request
    this.api = Api({
      beforeSend: loading.show,
      afterReturn: loading.hide
    })

    this.prompt = prompt
    this.noty = noty
    this.notyPrompt = notyPrompt
    this.notyConfirm = notyConfirm
    this.notyWarn = notyWarn

    this.construct()
  }
  async construct() {
    // webview 重新来到前台时（不论是调用 reveal，还是切换 tab）
    // 页面都会重新加载，所以原来的 state 不是现在的 state
    this.state = await this.api2.getState()
    // noState 往往意味着是新打开而不是 dispose 之后重新打开的页面
    this.noState = this.state === undefined
    this.init(this)
  }

  // 不应改成 saveState(state) 的形式，init 方法内的 state 引用将失效
  async saveState() {
    await this.api2.saveState(this.state)
  }
}

function putComputedColor() {
  const colors = getComputed('background-color', 'color')
  colors[0].prop = 'color0'
  colors[1].prop = 'color1'

  const $btn = document.createElement('button')
  document.querySelector('body').appendChild($btn)
  const result = getComputed.apply($btn, ['background-color'])
  $btn.remove()
  result[0].prop = 'color2'

  colors.push(result[0])
  config.prefix = ''
  writeStyle(colors)
}

window.debugClone = target => JSON.parse(JSON.stringify(target))