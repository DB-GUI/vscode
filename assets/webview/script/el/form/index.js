import { El, Span } from '../index.js'

export default class Form {
  constructor(data, fields) {
    this.data = data
    this.fields = fields
    this.inputs = {}
    this.$elList = fields.map(field => {
      const input = new field.type(field.name, data, field.options)
      this.inputs[field.name] = input
      return El(
        'label',
        field.required ? 'required' : null,
        [
          Span(field.label || field.name),
          input.$el
        ]
      )
    })
  }
  init(data) {
    this.data = data
    for(const f of this.fields)
      this.inputs[f.name].init(data)
  }
  onChange(handle) {
    for(const name in this.inputs)
      this.inputs[name].onChange(value => handle(name, value))
  }
}