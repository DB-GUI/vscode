import $ from '../../script/ppz-query.js'
import Page from '../../script/page.js'

new Page({
  init() {
    const page = this
    if(!page.state) {
      page.state = {
        record: PPZ.initData.data.record || {}
      }
      page.saveState()
    }
    const state = page.state
    
    const form = new $.Form(state.record, PPZ.initData.data.fields.map(field => ({
      // type: 'input', // 默认 input
      name: field.name,
      required: field.notNull
    })))
    form.onChange(() => page.saveState())
    
    function save(closeAfterInserted) {
      $.api.insert({
        closeAfterInserted,
        record: state.record
      })
    }

    $('body').classList.add('flex-container')
    $('body').append(
      $.Div('form', form.$elList),
      $.Div('form-btns', [
        // $.Button('清空', () => save()), // 清空 input
        // $.Button('重置', () => save()), // 拷贝页面可用，重置为原始值
        $.Button('保存并关闭', () => save(true)),
        $.Button('保存', () => save())
      ])
    )
  }
})