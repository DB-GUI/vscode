import { $, El, Div, Span, Button as _Button, Dialog, Checkbox } from '../../../../lib/dom/index.js'
import Icon from '../../cmps/icon/index.js'
import PNE from './pne-wrapper.js'
import Page from '../../script/page.js'
import Pagination, { config } from '../../cmps/pagination.js'

// 有些表，没主键，即使理论上可以精准删除、编辑，但复杂度攀升，不做考虑
new class extends Page {
  async init() {
    const page = this
    const setFields = neW => {
      const old = this.state.__fields
      for(let i in neW)
        //            initing page      || new field            || old value
        neW[i].show = old === undefined || old[i] === undefined || old[i].show
      this.state.__fields = neW
    }
    const setRecords = (records, count) => {
      this.state.__records = records
      this.state.pagination.count = count
    }
    const loadData = () => {
      return this.api.getData({
        pagination: this.state.pagination
      })
    }
    if(!this.state) {
      // 恢复 state 仅考虑恢复原来的页面，如果页面上的真实数据变了，不应在恢复 state 时处理
      // 因为页面在一直运行的过程中，真实数据也在变化
      this.state = {
        pagination: {
          index: 1,
          size: config.size,
          count: 0
        },
        table: null
      }
      const { fields, records, count } = await loadData()
      setFields(fields)
      setRecords(records, count)
      this.saveState()
    } else
      console.debug('initial state', page.state)
    const state = page.state

    const header = new function() {
      const pagination = new function() {
        const { count, index, size } = page.state.pagination
        const p = Pagination({
          count, index, size,
          onChange({ index, size }) {
            page.state.pagination = { index, size }
            // page.state.pagination.index = index
            // page.state.pagination.size = size
            // 上面两行代码，看似安全（好像在保护开发者（保留 count）），实则是把 bug 藏得更深了
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
            page.noty.warn('请先保存修改内容（或撤销）')
            evt.stopPropagation()
          }
        }, true)
        return p
      }

      const fieldSelector = new function() {
        const $fields = Div('fields')
        const $el = Dialog([
          $fields,
          Div('btns', [
            _Button('关闭', () => {
              $el.close()
            })
          ])
        ])
        populateFields()
        function populateFields() {
          // $fields.replaceChildren 由于未知原因而不行
          $fields.innerHTML = ''
          $fields.append(...state.__fields.map(
            field => new function() {
              const checkbox = new Checkbox(field.name, {
                onchange() {
                  field.show = checkbox.value
                  page.saveState()
                  table.render(state.__fields)
                }
              })
              checkbox.value = field.show
              return checkbox.$el
            }
          ))
        }
        return {
          $el,
          populateFields,
          show() {
            $el.showModal()
          }
        }
      }

      this.$el = El('header', [
        El('nav', new function() {
          const names = PPZ.initData.names.map(Span)
          const result = [names.shift()]
          for(const name of names)
            result.push(Icon('arrow-right'), name)
          return result
        }),
        Div('operations', [
          Div('btns', [
            Button('刷新', 'light', function() {
              if(table.isEditing()) {
                page.noty.warn('请先保存修改内容（或撤销）')
                return
              }
              refreshData()
            }),
            Button('字段选择', 'filter', fieldSelector.show),
            Button('新增', 'add', function() {
              newRecord()
            }),
            Button('拷贝当前记录', 'copy', function() {
              newRecord(true)
            }),
            Button('保存', 'save', async function() {
              const editing = table.getEditing()
              if(editing == null || editing.length == 0) {
                page.noty.warn('没有待保存的数据')
                return
              }
              const success = await page.api.update(editing)
              if(success)
                refreshData()
            }),
            Button('撤销全部', 'undo', function() {
              if(!table.isEditing()) {
                page.noty.warn('未检测到修改内容')
                return
              }
              page.prompt.warn('是否撤销全部修改', '', {
                确定() {
                  table.reset()
                }
              })
            }),
            Button('删除当前记录', 'delete', function() {
              if(!table.editable()) {
                page.noty.warn('当前表格不可编辑')
                return
              }
              if(table.isEditing()) {
                page.noty.warn('请先保存修改内容（或撤销）')
                return
              }
              const _state = state.table.focus
              if(!_state) {
                page.noty.warn('请先点击想要删除的记录')
                return
              }
              /* bug 预警 */
              let warnMsg = []
              for(const pk of table.pks())
                if(_state.pkValue[pk] === undefined) {
                  page.noty.fatal('state 不正常，缺少主键的值')
                  return
                } else
                  warnMsg.push(pk + ' 为 ' + _state.pkValue[pk])
              if(warnMsg.length == 0) {
                page.noty.fatal('逻辑不正常，正在删除没有主键的表记录')
                return
              }
              warnMsg = warnMsg.join(' 且 ')
              
              page.prompt.warn('确定删除？', '您正在删除 ' + warnMsg + ' 的记录，删除后不可恢复', {
                async 确定() {
                  const success = await page.api.drop(_state.pkValue)
                  if(success)
                    refreshData()
                }
              })
            }),
            Button('打开终端', 'terminal', function() {
              page.api2.openTerminal()
            })
          ]),
          pagination.$el
        ]),
        fieldSelector.$el
      ])

      async function newRecord(copy) {
        const data = {
          fields: state.__fields
        }
        if(copy) {
          if(state.table.focus)
            data.record = state.table.focus.record
          else {
            page.noty.warn('请先点击想要拷贝的记录')
            return
          }
        }
        page.api.newRecord(data)
        // 马上跳转新页面，此页面被 dispose
      }
      function Button(title, icon, handler) {
        const el = _Button([Icon(icon)], handler)
        el.title = title
        return el
      }
      
      async function refreshData() {
        const { fields, records, count } = await loadData()
        setFields(fields)
        setRecords(records, count)
        fieldSelector.populateFields()
        // page.saveState() // 交给 updateData 做
        table.updateData(fields, records)
      }
    }

    const table = PNE(
      page,
      state.__fields,
      state.__records,
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
}