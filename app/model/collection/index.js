const isNil = require('../../utils').isNil

module.exports = class Collection {
  constructor(name) {
    this.name = name
  }
  
  getAllData() {
    let data = Context.globalState.get(this.name)
    if(isNil(data))
      data = this.initData()
    this.validate(data)
    return data
  }

  initData() {
    return {}
  }

  save(data) {
    this.validate(data)
    return Context.globalState.update(this.name, this.data)
  }
  
  validate(data) {
    throw Error('未实现 validate 方法')
  }
}