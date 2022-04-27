import $ from '../../script/ppz-query.js'
import Page from '../../script/page.js'

new Page({
  async init() {
    const page = this
    if(!this.state) {
      const { fields, records } = await $.api.getData()
      const selectParams = {
        fields: fields.map(f => f.name)
      }
      this.state = {
        fields,
        selectParams,
        records
      }
      this.saveState()
    } else
      console.debug('initial state', page.state)

    const header = new function() {
      this.$el = $.El('header', '', [
        $.El('nav', '', [
          $.Span(PPZ.initData.connection),
          $.Icon('arrow-right2'),
          $.Span(PPZ.initData.database),
          $.Icon('arrow-right2'),
          $.Span(PPZ.initData.table)
        ]),
        $.Div('operations', [
          $.Div('btns', [
            // 通过事件来传达各种状态
            Button('查询', 'light', refreshData),
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
        $.Noty.success('数据已刷新')
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
            $.El('th', 'pre-unit'),
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