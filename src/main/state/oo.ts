import { Memento } from 'vscode'
import { v4 as UUID } from 'uuid'

interface Record {
  _id: string
}
export
interface SystemConfig extends Record {
  version: string
}

export
interface Connection_info<Connection_config> extends Record {
  name: string
  adapter: string
  config: Connection_config
}

export
interface All_state {
  system: State<SystemConfig>
  connection: State_list<Connection_info<any>>
}

type Raw_state = Memento & {setKeysForSync: any}

export
class State<Value> {
  constructor(
    private state: Raw_state,
    private key: string,
  ) {}
  get(default_value: Value) {
    return this.state.get(this.key, default_value)
  }
  async save(value: Value) {
    return await this.state.update(this.key, value)
  }
}

export
class State_list<R extends Record> extends State<R[]> {
  get() {
    return super.get([])
  }
  get_by_id(id: string) {
    return this.get().find(record => record._id == id)
  }
  async add(record: R) {
    record._id = UUID()
    const records = this.get()
    records.push(record)
    await this.save(records)
    return record._id
  }
  async update(record: R) {
    const records = this.get()
    const index = records.findIndex(r => r._id == record._id)
    if(index == -1)
      throw Error('error on update list state: target nonexistent')
    const old_record = records.splice(index, 1, record)
    await this.save(records)
    return old_record
  }
}
