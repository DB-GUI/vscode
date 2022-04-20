import $ from '../../../script/ppz-query.js'

export default class Connection {
  constructor(label, client, onSelect, fields) {
    this.data = { client }
    this.onSelect = onSelect

    this.$selectorOption = $.Button([label], () => this.select())
    this.$forms = $.Div('forms', [
      $.Div('form', new $.Form(this.data, [{ name: 'name' }]).$elList),
      $.Div('form', new $.Form(this.data, fields).$elList)
    ])
  }
  select() {
    this.onSelect(this.data)
  }
}