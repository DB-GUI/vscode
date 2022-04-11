import $ from '../../script/ppz-query.js'
import twb from '../../script/two-way-data-binding.js'
import Page from '../../script/page.js'

new Page({
  initState() {
    return {
      data: PPZ.initData
    }
  },
  init() {
    const { subject: data, items} = twb('form', this.state.data.value)
    this.state.data = data
    for(const key in items)
      // 每一个 key 值变化，都更新 state.data
      items[key].push(() =>
        this.saveState()
      )

    $('form').onsubmit = function(evt) {
      switch(evt.submitter.id) {
        case 'connect':
          save(true)
          break
        case 'save':
          save()
          break
      }
      evt.preventDefault()
    }
    
    function save(connect) {
      console.debug('保存连接', { connect })
      data.client = 'mysql'
      VSCODE.postMessage({
        type: 'save',
        data: {
          connect,
          connection: data
        }
      })
    }
  }
})
