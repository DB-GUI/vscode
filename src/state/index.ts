import { ExtensionContext, Memento } from 'vscode'
import { v4 as UUID } from 'uuid'
import migrate from './migrate'

class State<Value> {
  state: Memento & {setKeysForSync}
  key: string
  constructor(state, key) {
    this.state = state
    this.key = key
  }

  get(default_value: Value) {
    return this.state.get(this.key, default_value)
  }
  async save(value: Value) {
    return await this.state.update(this.key, value)
  }
}

interface Base_record {
  _id: string
}

class List_state<Record extends Base_record> extends State<Record[]> {
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
    const index = records.findIndex(r => r._id == record.id)
    if(index == -1)
      throw Error('error on update list state: target nonexistent')
    const old_record = records.splice(index, 1, record)
    await this.save(records)
    return old_record
  }
}

export
async function init(context: ExtensionContext) {
  const state = context.globalState
  await migrate(state)
  return {
    system: new State(state, 'system'),
    connection: new List_state(state, 'connection'),
  }
}
