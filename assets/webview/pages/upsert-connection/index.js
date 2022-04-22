import $ from '../../script/ppz-query.js'
import Page from '../../script/page.js'
import Form from './form.js'

new Page({
  init() {
    const $form = Form(this.state) // 把 state 交给子组件管理，不是好想法！

    const btns = new function() {
      const connBtn = $.Button(['连接'], () => save(true))
      const saveBtn = $.Button(['保存'], () => save())

      function save(connect) {
        console.log('data', this.state.data)
      }
      return $.Div('form-btns', [connBtn, saveBtn])
    }

    $('body').classList.add('flex-container')
    $('body').append($form, btns)
  }
})
