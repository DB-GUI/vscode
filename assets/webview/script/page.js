import State, { unstate } from './state.js'
import $ from './ppz-query.js'

// 应保持页面代码量少，不添加类 Composition Api 特性
export default class Page {
  constructor(options) {
    // webview 重新来到前台时（不论是调用 reveal，还是切换 tab）
    // 页面都会重新加载，所以原来的 state 不是现在的 state
    this.state = State(VSCODE.getState() || options.initState())
    if(options.init)
      options.init.apply(this, [{}])
    
    window.onunload = () => this.onunload()
  }

  onunload() {
    VSCODE.setState(unstate(this.state))
  }

  msgState(...msgTypes) {
    for(const msgType of msgTypes)
      $.msg(msgType, data => {
        this.state[msgType].value = data
      })
  }
}