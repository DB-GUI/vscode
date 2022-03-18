const Collection = require('./collection/index')
const { Type, FieldWrongDetail } = require('@ppzp/type')

const type = new Type([
  {
    name: 'version',
    validate: 'string',
    notNull: true
  }
])

class SystemCollection extends Collection {
  constructor() {
    super('system')
  }

  validate(data) {
    const result = type.validate(data)
    if(result)
      throw Error('validating system Collection ' + result)
  }

  newInstall() {
    return Context.globalState.keys().length == 0
  }
}

module.exports = new SystemCollection()