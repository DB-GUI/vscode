const Collection = require('./collection/index')
const { Type, FieldWrongDetail } = require('@ppzp/type')

const type = new Type([
  {
    name: 'version',
    validate: 'truestring',
    notNull: true
  }
])

class SystemCollection extends Collection {
  constructor() {
    super('system')
  }

  validate(data) {
    const result = type.validate(data)
    if(result) {
      console.error('validating "system collection":', data)
      throw Error(result)
    }
  }

  newInstall() {
    return Context.globalState.get(this.name) == undefined
  }
}

module.exports = new SystemCollection()