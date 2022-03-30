import $ from '../../script/ppz-query.js'
const $body = $('body')

var $$params = new function() {
  const $params = $.El('div', 'params')
  var $$fields = new function() {
    let $fields = $.El('div', 'fields') // fields 容器
    const Field = function() {
      function Field(options) {
        this.$el = $.El('div', 'item', [options.name])
        this.$el.title = options.name + ': ' + options.type
      }
      return Field
    }()
    $.msg('fields', fields => {
      this.items = fields.map(f => new Field(f))
      $fields.replaceChildren(...this.items.map(item => item.$el))
    })
    $params.appendChild($fields)
  }
  $body.appendChild($params)
}