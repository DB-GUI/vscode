import { Memento } from 'vscode'
import { v4 as UUID } from 'uuid'

interface Base_record {
  _id: string
}
interface SystemConfig extends Base_record {
  version: string
}
interface Connection extends Base_record {
  name: string
}
export
interface All_state {
  system: State<SystemConfig>
  connection: List_state<Connection>
}

type Raw_state = Memento & {setKeysForSync: any}

export
class State<Value> {
  state: Raw_state
  key: string
  constructor(state: Raw_state, key: string) {
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

export
class List_state<Record extends Base_record> extends State<Record[]> {
  get() {
    return super.get([])
  }
  get_by_id(id: string) {
    return this.get().find(record => record._id == id)
  }
  async add(record: Record) {
    record._id = UUID()
    const records = this.get()
    records.push(record)
    await this.save(records)
    return record._id
  }
  async update(record: Record) {
    const records = this.get()
    const index = records.findIndex(r => r._id == record._id)
    if(index == -1)
      throw Error('error on update list state: target nonexistent')
    const old_record = records.splice(index, 1, record)
    await this.save(records)
    return old_record
  }
}
