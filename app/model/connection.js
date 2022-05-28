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
  ]),
  sqlite3: Type([
    ['name', 'string'],
    ['filename', 'truestring', true]
  ]),
  postgresql: Type([
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
    const validater = type[record.client]
    if(!validater)
      throw Error(`the "${record.client}" client type is not supported`)
    let result = validater.validate(record)
    if(result)
      throw result
  }
}

module.exports = new ConnectionCollection()