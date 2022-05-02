import $ from '../../script/ppz-query.js'
import Page from '../../script/page.js'
import Pagination, { config } from '../../cmps/pagination.js'

new Page({
  async init() {
    const page = this
    if(!this.state) {
      const selectParams = {
        pagination: {
          index: 1,
          size: config.size,
          count: 0
        }
      }
      const { fields, records, count } = await $.api.getData(selectParams)
      selectParams.fields = fields.map(f => f.name)
      selectParams.pagination.count = count
      
      this.state = {
        fields,
        records,
        selectParams
      }
      this.saveState()
    } else
      console.debug('initial state', page.state)
    
    const header = new function() {
      const pagination = new function() {
        const { count, index, size } = page.state.selectParams.pagination
        return Pagination({
          count, index, size,
          onChange({ index, size }) {
            page.state.selectParams.pagination = { index, size }
            // count 在返回后设置，state 在返回后保存
            refreshData()
          }
        })
      }
      
      this.$el = $.El('header', '', [
        $.El('nav', '', [
          $.Span(PPZ.initData.connection),
          $.Icon('arrow-right'),
          $.Span(PPZ.initData.database),
          $.Icon('arrow-right'),
          $.Span(PPZ.initData.table)
        ]),
        $.Div('operations', [
          $.Div('btns', [
            // 通过事件来传达各种状态
            Button('刷新', 'light', refreshData),
            new function() {
              const $el = Button('字段', 'filter', function() {
              })
              return $el
            },
            new function() {
              const $el = Button('新增', 'add', function() {
              })
              return $el
            },
            new function() {
              const $el = Button('删除', 'delete', function() {
              })
              return $el
            },
            new function() {
              const $el = Button('保存', 'save', function() {
              })
              return $el
            },
            new function() {
              const $el = Button('取消', 'return', function() {
              })
              return $el
            }
          ]),
          pagination.$el
        ])
      ])
      
      function Button(title, icon, handler) {
        const el = $.Button('', [$.Icon(icon)], handler)
        el.title = title
        return el
      }
      
      async function refreshData() {
        const { fields, records } = await $.api.getData(page.state.selectParams)
        page.state.fields = fields
        page.state.records = records
        page.saveState()
        table.updateData()
      }
    }

    const table = new function() {
      const table = new $.Table(
        getTHead(),
        getTBody()
      )
      this.updateData = function() {
        table.thead(getTHead())
        table.tbody(getTBody())
      }
      
      function getTHead() {
        return [$.El('th', 'pre-unit'), ...page.state.fields.map(f => f.name)]
      }
      function getTBody() {
        return page.state.records.map(
          record => ([
            $.El('td', 'pre-unit'),
            ...page.state.fields.map(
              f => record[f.name]
            )
          ])
        )
      }
      this.$el = $.Div('table-wrapper', [table.$el])
    }

    $('body').append(
      header.$el,
      table.$el
    )
  }
})