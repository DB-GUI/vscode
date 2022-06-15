const isNil = require('../../utils').isNil
const Collection = require('./index')
const { v4: UUID } = require('uuid')

module.exports = class ArrayCollection extends Collection {
  constructor(name, pkField = 'id') {
    super(name)
    this.pkField = pkField
  }
  
  initData() {
    return []
  }
  
  err(msg) {
    throw this.name + ' Array Collection ' + msg
  }
  validateErr(msg) {
    this.err('format error: ' + msg)
  }

  validate(list) {
    if(!(list instanceof Array))
      this.validateErr('not an Array?')
    const pkSet = new Set()
    for(const record of list) {
      if(isNil(record))
        this.validateErr('record is nil')
      const pk = record[this.pkField]
      if(isNil(pk))
        this.validateErr('primary key is nil')
      if(pkSet.has(pk))
        this.validateErr('duplicated primary key')
      pkSet.add(pk)
      this.validateOne(record)
    }
  }

  validateOne(record) {
    this.validateErr('validateOne method unimplemented')
  }
  
  getByKey(key) {
    return this.getAll().find(record => record[this.pkField] == key)
  }

  save(data) {
    console.warn('you are saving data using ArrayCollection.prototype.save')
    return super.save(data)
  }

  async upsert(record) {
    if(isNil(record))
      this.err('upsert error: record is nil')
    const list = this.getAll()
    let pk = record[this.pkField]
    if(pk) { // update
      const index = list.findIndex(record => record[this.pkField] == pk)
      if(index == -1)
        throw Error('updating record which doesn\'t exist')
      list.splice(index, 1, record)
    } else {
      record[this.pkField] = UUID()
      list.push(record)
    }
    await super.save(list)
    return record[this.pkField]
  }

  drop(key) {
    const list = this.getAll()
    const index = list.findIndex(record => record[this.pkField] == key)
    if(index == -1)
      throw Error('deleting record which not exist')
    list.splice(index, 1)
    return super.save(list)
  }
}
