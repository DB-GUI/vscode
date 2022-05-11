import $ from '../../script/ppz-query.js'
import Page from '../../script/page.js'
import Pagination, { config } from '../../cmps/pagination.js'
import PNE from './pne-wrapper.js'

// 有些表，没主键，即使理论上可以精准删除、编辑，但复杂度攀升，不做考虑
new Page({
  async init() {
    const page = this
    if(!this.state) {
      // 恢复 state 仅考虑恢复原来的页面，如果页面上的真实数据变了，不应在恢复 state 时处理
      // 因为页面在一直运行的过程中，真实数据也在变化
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
        selectParams,
        table: null
      }
      this.saveState()
    } else
      console.debug('initial state', page.state)
    const state = page.state

    const header = new function() {
      const pagination = new function() {
        const { count, index, size } = page.state.selectParams.pagination
        const p = Pagination({
          count, index, size,
          onChange({ index, size }) {
            page.state.selectParams.pagination = { index, size }
            // count 在返回后设置，state 在返回后保存
            refreshData()
          }
        })
        const isDisabledBtn = btn => btn.tagName == 'BUTTON' && btn.disabled
        p.$el.addEventListener('click', function(evt) {
          const name = evt.target.tagName
          if(!['BUTTON', 'svg', 'use'].includes(name)) return // 不是按钮的不处理
          if(isDisabledBtn(evt.target) // 是按钮但 disabled 的也不处理
            || isDisabledBtn(evt.target.parentElement)
            || isDisabledBtn(evt.target.parentElement.parentElement)) return
          
          if(table.isEditing()) {
            $.noty.warn('请先保存或撤销全部修改')
            evt.stopPropagation()
          }
        }, true)
        return p
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
            Button('刷新', 'light', function() {
              if(table.isEditing()) {
                $.noty.warn('请先保存或撤销全部修改')
                return
              }
              refreshData()
            }),
            Button('字段选择', 'filter', function() {
            }),
            Button('新增', 'add', function() {
            }),
            Button('拷贝当前记录', 'copy', function() {
            }),
            Button('保存', 'save', function() {
              if(!table.isEditing()) {
                $.noty.warn('没有待保存的数据')
                return
              }
              console.log(state.table)
            }),
            Button('撤销全部', 'undo', function() {
            }),
            Button('删除当前记录', 'delete', function() {
            }),
            Button('打开 sql 文件', 'sql', function() {
            })
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
        state.fields = fields
        state.records = records
        // page.saveState() // 交给 updateData 做
        table.updateData(fields, records)
      }
    }

    const table = PNE(
      state.fields,
      state.records,
      state.table, // state
      tableState => { // saveState
        if(tableState)
          state.table = tableState
        page.saveState()
      }
    )

    $('body').append(
      header.$el,
      table.$el
    )
  }
})
