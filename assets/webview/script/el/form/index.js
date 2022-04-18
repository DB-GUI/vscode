import { El, Span } from '../index.js'
import { TextInput, SelectInput, FileInput } from './input.js'

const InputMap = {
  input: TextInput,
  select: SelectInput,
  file: FileInput,
}

export default class Form {
  constructor(data, fields) {
    this.inputs = {}
    this.elList = fields.map(field => {
      const input = new InputMap[field.type || 'input'](field, data)
      this.inputs[field.name] = input
      return El('label', null, [
        Span(field.label || field.name),
        input.$el
      ])
    })
  }
  init(data) {
    for(const f of fields)
      f.input.init(data)
  }
}