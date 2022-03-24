const isNil = require('../../utils').isNil

class Collection {
  constructor(name) {
    Collection.instances.push(this)
    this.name = name
  }
  
  getAllData() {
    let data = Context.globalState.get(this.name)
    if(isNil(data))
      data = this.initData()
    return data
  }

  initData() {
    return {}
  }

  save(data) {
    this.validate(data)
    return Context.globalState.update(this.name, data)
  }
  
  validate(data) {
    throw Error('未实现 validate 方法')
  }
}

Collection.instances = []

module.exports = Collection