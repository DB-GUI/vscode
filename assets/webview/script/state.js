export default function State(data) {
  const map = new Map()
  for(const key in data)
    map.set(key, new Property(data[key]))
  
  return new Proxy(data, {
    get(target, p) {
      return map.get(p)
    },
    set(target, p, value) {
      // 如果初始化时，data 里没有，则永远不应该有
      map.get(p).update(value)
      return true
    }
  })
}

class Property {
  constructor(value) {
    this.watchers = []
    this.value = value
  }
  update(value) {
    this.value = value
    try {
      for(const watcher of this.watchers)
        watcher(value)
    } catch(err) {
      console.error('error on updating property, one of the watchers failed')
      throw err
    }
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
    if(index == -1)
      return -1
    
    this.watchers.splice(index, 1)
    return index
  }
}