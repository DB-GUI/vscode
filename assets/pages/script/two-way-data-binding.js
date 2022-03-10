import $ from './ppz-query.js'

class Observer {
  constructor(subject) {
    // 被观察的普通“对象”，非基本数据类型、非数组
    this.subject = subject
    // 观察的是目标里的 key-value，普通对象有多个 kv，对应多个 items
    this.items = {}
    // 观察现有属性
    for(let key in subject)
      this.observe(key, subject[key])
  }

  observe(key, value) {
    this.items[key] = [] // 为每一个 key-value 设置“通知列表”
    Object.defineProperty(this.subject, key, {
      enumerable: true,
      get: () => value,
      set: v => {
        if(value != v) {
          value = v
          this.noty(key, v)
        }
      }
    })
  }

  // 观察者观察到 subject 的属性发生变化时，向外通知
  noty(key, value) {
    // this 像是二道贩子，真正的观察者其实是下面的 observer
    this.items[key].forEach(observer =>
      observer(value)
    )
  }

  add(key, observer) {
    this.items[key].push(observer)
  }

  remove(key, observer) {
    const list = this.items[key]
    list.splice(list.indexOf(observer), 1)
  }
}

export default function twoWayDataBinding($form, data = {}) {
  $form = $($form)
  const observer = new Observer(data)

  // 遍历所有 input
  for(const { selector, get, set, on } of operations) {
    const inputs = $form.querySelectorAll(selector)
    for(const input of inputs) { // 为每一个 input 双向绑定
      const key = input.name
      if(key in observer.subject)
        // 如果 subject 有值，设置 input 的初始值
        set(input, observer.subject[key])
      else
        // 没值，添加值，并观察
        observer.observe(key, get(input))
      
      // 观察 key，即 input.name，以 subject[key] 发生变化时，更新 input
      observer.add(key, value => {
        set(input, value)
      })
      // input 的变化，更新 subject（反观察）
      input.addEventListener(on, e => {
        observer.subject[key] = get(e.target)
      })
    }
  }
  return observer
}

// 如果以后有机会独立发布，下面的 export 能允许用户自己定义 operation

export class InputOperation {
  constructor({ selector, get, set, on }) {
    this.selector = selector
    if(get) this.get = get
    if(set) this.set = set
    this.on = on || 'input'
  }
  get(el) {
    return el.value
  }
  set(el, value) {
    if($.isNil(value))
      value = ''
    el.value = value
  }
}

export const operations = [
  new InputOperation({
    selector: 'input'
  })
]