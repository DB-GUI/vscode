import $ from './ppz-query.js'
import ColorValue from '../../../lib/color-value/index.js'

ColorValue('color', 'background-color')

// 应保持页面代码量少，不添加类 Composition Api 特性
export default class Page {
  constructor(options) {
    // webview 重新来到前台时（不论是调用 reveal，还是切换 tab）
    // 页面都会重新加载，所以原来的 state 不是现在的 state
    $.run(async () => {
      this.state = await $.request('getState')
      if(options.init)
        options.init.apply(this, [{}])
    })
  }

  async saveState() {
    await $.request('saveState', this.state)
  }
}