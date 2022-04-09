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
        Button('查询', 'light', function() {
        }),
        function() {
          const $el = Button('字段', 'filter', function() {
          })
          return $el
        }(),
        function() {
          const $el = Button('新增', 'add', function() {
          })
          return $el
        }(),
        function() {
          const $el = Button('删除', 'delete', function() {
          })
          return $el
        }(),
        function() {
          const $el = Button('保存', 'save', function() {
          })
          return $el
        }(),
        function() {
          const $el = Button('取消', 'return', function() {
          })
          return $el
        }()
      ]),
    ])
  ])
  
  function Button(title, icon, handler) {
    const el = $.Div('', [$.Icon(icon)])
    el.title = title
    el.onclick = handler
    return el
  }
}

$('body').append(
  header.$el,
)