import $ from '../../script/ppz-query.js'

const header = new function() {
  this.$el = $.El('header', '', [
    $.El('nav', '', [
      $.Span(PPZ.initData.connection),
      $.Icon('arrow-right2'),
      $.Span(PPZ.initData.database),
      $.Icon('arrow-right2'),
      $.Span(PPZ.initData.table)
    ]),
    $.Div('operations', [
      $.Div('btns', [
        // 通过事件来传达各种状态
        Button('查询', function() {
        }),
        function() {
          const $el = Button('字段', function() {
          })
          return $el
        }(),
        function() {
          const $el = Button('新增', function() {
          })
          return $el
        }(),
        function() {
          const $el = Button('删除', function() {
          })
          return $el
        }(),
        function() {
          const $el = Button('保存', function() {
          })
          return $el
        }(),
        function() {
          const $el = Button('取消', function() {
          })
          return $el
        }()
      ]),
    ])
  ])
  
  function Button(label, icon, handler) {
    if(!handler) {
      handler = icon
      icon = undefined
    }
    const children = [$.Span(label)]
    if(icon)
      children.unshift($.Icon(icon))
    const el = $.Div('', children)
    el.onclick = handler
    return el
  }
}

$('body').append(
  header.$el,
)