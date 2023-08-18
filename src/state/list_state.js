const { v4: UUID } = require('uuid')
const State = require('./state')

module.exports =
class List_state extends State {
  get() {
    return super.get([])
  }
  get_by_id(id) {
    return this.get().find(record => record._id == id)
  }
  async add(record) {
    record._id = UUID()
    const records = this.get()
    records.push(record)
    await this.save(records)
    return record._id
  }
  async update(record) {
    const records = this.get()
    const index = records.indexOf(r => r._id == record.id)
    if(index == -1)
      throw Error('error on update list state: target nonexistent')
    const old_record = records.splice(index, 1, record)
    await this.save(records)
    return old_record
  }
}
