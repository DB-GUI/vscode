import $ from '../../../script/ppz-query.js'

export default class Connection {
  constructor(label, client, onSelect, fields) {
    this.data = { client }
    this.onSelect = onSelect

    const $btn = $.Button([label], () => this.select())
    this.$el = $.Div(null, [
      $btn,
      $.Div('inputs', [
        $.Div('public', new $.Form(this.data, [{ name: 'name' }]).$elList),
        $.Div('private', new $.Form(this.data, fields).$elList)
      ])
    ])
  }
  select() {
    this.onSelect(this.data)
  }
}