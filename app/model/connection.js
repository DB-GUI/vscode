const ArrayCollection = require('./collection/array')
const { Type } = require('../utils')

const type = {
  mysql: Type([
    ['id', 'string'],
    ['host', true, 'string'],
    ['port', 'string'],
    ['user', true, 'string'],
    ['password', true, 'string'],
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