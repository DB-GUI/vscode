export default function State(data) {
  const state = {}
  for(const key in data)
    state[key] = new Property(data[key])
  return state
}

export function unstate(state) {
  const result = {}
  for(const key in state)
    result[key] = state[key].value
  return result
}

class Property {
  constructor(value) {
    this.watchers = []
    Object.defineProperty(this, 'value', {
      get: () => value,
      set: newValue => {
        value = newValue
        for(const watcher of this.watchers)
          watcher(value)
      }
    })
  }

  do(watcher) {
    watcher(this.value)
    return this.watch(watcher)
  }

  watch(watcher) {
    this.watchers.push(watcher)
    return () => this.unwatch(watcher)
  }
  unwatch(watcher) {
    const index = this.watchers.indexOf(watcher)
    if(index != -1)
      this.watchers.splice(index, 1)
    return index
  }
}