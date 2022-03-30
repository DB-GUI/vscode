import $ from '../../script/ppz-query.js'
import Checkbox from '../../cmps/checkbox.js'
import Button from '../../cmps/button.js'

var $$params = new function() {
  // 获取参数
  this.get = function() {
    return {
      fields: $$fields.get(),
    }
  }
  // 字段列表
  var $$fields = new function() {
    let items = [] // Field 组件们
    this.$el = $.Div('fields')
    // 字段类
    const Field = function() {
      function Field(options) {
        const field = new Checkbox(options.name, true, options.name + ': ' + options.type)
        field.options = options
        // field.method = ...
        return field
      }
      // function method() {}
      return Field
    }()
    // 获取已选字段
    this.get = () => items
      .filter(field => field.checked())
      .map(field => field.options.name)
    $.msg('fields', fields => {
      items = fields.map(f => new Field(f))
      this.$el.replaceChildren(...items.map(item => item.$el))
    })
  }
  
  this.$el = $.Div('params', [
    $$fields.$el
  ])
}

var $$btns = new function() {
  const select = new Button('查询', function() {
    console.log($$params.get())
  })
  this.$el = $.Div('btns', [
    select
  ])
}

$('body').append(
  $$params.$el,
  $$btns.$el
)