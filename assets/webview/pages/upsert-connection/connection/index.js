export default class Connection {
  constructor(name, fields) {
    this.name = name
    this.commonFields = [
      { name: 'name' }
    ]
    this.fields = fields
  }
}