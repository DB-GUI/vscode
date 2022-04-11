const ArrayCollection = require('./collection/array')
const { Type } = require('../utils')

const type = {
  mysql: Type([
    ['name', 'string'],
    ['host', 'truestring', true],
    ['port', 'string'],
    ['user', 'truestring', true],
    ['password', 'truestring', true],
    ['database', 'string']
  ])
}

class ConnectionCollection extends ArrayCollection {
  constructor() {
    super('connection')
  }

  validateOne(record) {
    let result = type[record.client].validate(record)
    if(result)
      throw result
  }
}

module.exports = new ConnectionCollection()