import $ from '../../../script/ppz-query.js'

export default class Connection {
  constructor(label, client, fields) {
    this.label = label
    this.client = client
    this.commonFields = [
      { name: 'name' }
    ]
    this.fields = fields
  }

  getForm() {
    const data = {}
    return {
      data,
      $elList: [
        $.Div('common', new $.Form(data, this.commonFields).$elList),
        $.Div('private', new $.Form(data, this.fields).$elList)
      ]
    }
  }
}