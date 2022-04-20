import $ from '../../script/ppz-query.js'
import Page from '../../script/page.js'
import Form from './form.js'

new Page({
  initState() {
    return {
      data: PPZ.initData
    }
  },
  init() {
    const data = this.state.data
    const $form = Form(data) // 把 state 交给子组件管理，不是好想法，除非只让子组件管

    const btns = new function() {
      const connBtn = $.Button(['连接'], () => save(true))
      const saveBtn = $.Button(['保存'], () => save())

      function save(connect) {
        console.log('data', data.value)
      }
      return $.Div('btns', [connBtn, saveBtn])
    }

    $('body').append($form, btns)
  }
})
