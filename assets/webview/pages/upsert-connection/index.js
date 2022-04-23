import $ from '../../script/ppz-query.js'
import Page from '../../script/page.js'
import { initState, Forms, getData } from './form.js'

new Page({
  init() {
    const self = this
    if(!this.state) {
      this.state = initState(PPZ.initData)
      this.saveState() // 这样虽然繁琐，但省掉了“理解”成本
    }
    const $forms = Forms(this.state, () => this.saveState())

    const btns = new function() {
      const connBtn = $.Button(['连接'], () => save(true))
      const saveBtn = $.Button(['保存'], () => save())

      function save(connect) {
        const data = getData(self.state)
        console.log({ data })
      }
      return $.Div('form-btns', [connBtn, saveBtn])
    }

    $('body').classList.add('flex-container')
    $('body').append($forms, btns)
  }
})
