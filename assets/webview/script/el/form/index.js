import { El, Span } from '../index.js'
import { TextInput, SelectInput, FileInput } from './input.js'

const InputMap = {
  input: TextInput,
  select: SelectInput,
  file: FileInput,
}

export default class Form {
  constructor(data, fields) {
    this.data = data
    this.fields = fields
    this.inputs = {}
    this.$elList = fields.map(field => {
      const input = new InputMap[field.type || 'input'](field, data)
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
}