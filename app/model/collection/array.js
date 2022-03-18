const isNil = require('../../utils').isNil
const Collection = require('./index')
const { v4: UUID } = require('uuid')

module.exports = class ArrayCollection extends Collection {
  constructor(name, pkField) {
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
    return this.getAllData().find(record => record[this.pkField] == key)
  }

  upsert(record) {
    if(isNil(record))
      this.err('upsert error: record is nil')
    const list = this.getAllData()
    let pk = record[this.pkField]
    if(pk) { // update
      const index = list.findIndex(record => record[this.pkField] == pk)
      list.splice(index, 1, record)
    } else {
      record[this.pkField] = UUID()
      list.push(record)
    }
    this.save(list)
  }

  drop(key) {
    const list = this.getAllData()
    const index = list.findIndex(record => record[this.pkField] == key)
    list.splice(index, 1)
    this.save(list)
  }
}
