import $ from '../../script/ppz-query.js'
import Page from '../../script/page.js'
import Mysql from './connection/mysql.js'
import Sqlite3 from './connection/sqlite3.js'

new Page({
  initState() {
    return {
      data: PPZ.initData
    }
  },
  init() {
    const form = new function() {
      // 设置连接类型
      const setClient = now => {
        // 新造一个 form
        const form = conns[now].getForm()
        // 设置 this（外层）的 data
        this.data = form.data
        // 更新 inputs 容器
        inputs.replaceChildren(...form.$elList)

        // 更新按钮样式
        const old = $.getOldSetNow(now)
        if(old != undefined)
          inputs.children[old].class = ''
        inputs.children[now].class = 'current'
      }

      // 初始化各类型
      const conns = [
        new Mysql(),
        new Sqlite3()
      ]

      // 类型选择组件
      const clientSelect = new function() {
        return $.Div('client-select', conns.map(
          (conn, index) => 
            $.Button([conn.label], () => setClient(index))
          )
        )
      }

      // inputs 容器
      const inputs = $.Div('inputs')

      // 设置当前类型为第一个类型
      setClient(0)

      this.$el = $.Div('form', [
        clientSelect,
        inputs
      ])
    }

    const btns = new function() {
      const connBtn = $.Button(['连接'], () => save(true))
      const saveBtn = $.Button(['保存'], () => save())

      function save(connect) {
        console.log('data', form.data)
      }
      return $.Div('btns', [connBtn, saveBtn])
    }

    $('body').append(form.$el, btns)
  }
})
