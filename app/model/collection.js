class Collection {
  constructor(name) {
    this.name = name
  }

  getAllData() {
    if(this.__data)
      return this.__data
    else
      return this.__data = Context.globalState.get(this.name)
  }
  save() {
    return Context.globalState.update(this.name, this.__data)
  }
  validate() {
    throw Error('未实现 validate 方法')
  }
}

exports.ArrayCollection = class extends Collection {
  constructor(name, pkField) {
    super(name)
    this.pkField = pkField
  }
  getAllData() {
    let data = super.getAllData()
    if(!data) {
      this.__data = {}
      this.save()
    }
  }
  getList() {
    return Object.values(this.getAllData() || {})
  }
  getByKey(key) {
    
  }
}