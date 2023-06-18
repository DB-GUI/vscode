import VuePage from '../../script/vue/page.js'
import * as Nav from './nav.js'
import * as SearchItem from './search-item.js'

const pageSize = (function() {
  const el = document.querySelector('.table-wrapper')
  const height = el.clientHeight
  return Math.floor((height - 26 - 12.6) / 26) // 12.6 是可能出现的横向滚动条
})()

VuePage(function(page) {
  const tableName = PPZ.initData.names[PPZ.initData.names.length - 1]

  return {
    initData() {
      return {
        pageName:'table',
        selectParams: {
          search: [],
          page: { count: 0, size: pageSize, index: 1 }
        },
        sql: {
          clause: '',
          noPagination: true
        },
        fields: [],
        records: [],
        pneOptions: null,
        list:[{ label: page.state.l10n.withPaging , value: false }, { label: page.state.l10n.withoutPaging, value: true }]
      }
    },
    methods: {
      async putData(isRefresh) {
        const { fields, records, count } = await page.api.getData({
          params: this.selectParams,
          // 头回加载数据时，没有 pneOptions
          sort: this.pneOptions && this.pneOptions.sort
        })
        this.selectParams.page.count = count
        this.setFields(fields)
        this.setRecords(records)
        if(isRefresh === true)
          page.noty.info(page.state.l10n.dataRefreshed)
      },
      addSearch() {
        this.selectParams.search.push(SearchItem.newItemData())
      },
      async checkSQL() {
        const params = debugClone(this.selectParams)
        if(this.sql.noPagination)
          delete params.page
        const { sql } = await page.api.checkSQL({
          params,
          sort: this.pneOptions && this.pneOptions.sort
        })
        this.sql.clause = sql
        try {
          this.$refs.sqlViewer.showModal()
        } catch(e) {}
      },
      async writeClipboard() {
        try {
          await navigator.clipboard.writeText(this.sql.clause)
          page.noty.info(page.state.l10n.copyedToClipboard)
        } catch {
          page.noty.fatal(page.state.l10n.exception)
        }
      },
      search() {
        this.putData()
        this.$refs.searchDialog.close()
      },
      emptySearch() {
        this.selectParams.search = []
      },
      openFileWithSQL() {
        page.api.openFile({
          content: this.sql.clause,
          language: 'sql'
        })
      },
      openTerminalWithSQL() {
        page.api.openTerminal(this.sql.clause)
      },
      setFields(fields) {
        const oldMap = {}
        for(const f of this.fields)
          oldMap[f.name] = f
        for(const f of fields) {
          const old = oldMap[f.name]
          if(old)
            f.show = old.show
          else
            f.show = true
        }
        this.fields = fields
      },
      setRecords(records) {
        this.pneOptions = {
          sort: this.pneOptions && this.pneOptions.sort || [],
          focus: {},
          editing: {}
        }
        this.records = records
      },

      beforePage(evt) {
        if(this.isEditing) {
          evt.stopPropagation()
          return page.noty.warn(page.state.l10n.pleaseSaveOrUndoModify)
        }
      },

      refresh() {
        if(this.isEditing) // 这里不能把按钮变灰，要不然用户不知道为什么灰
          return page.noty.warn(page.state.l10n.pleaseSaveOrUndoModify)
        this.putData(true)
      },
      newRecord(copy) {
        const data = {
          fields: this.fields
        }
        if(copy)
          data.record = this.focusedRecord
        page.api.newRecord(data)
      },
      drop() {
        if(this.isEditing)
          return page.noty.warn(page.state.l10n.pleaseSaveOrUndoModify)
        const warning = this.pkNames
          .map(name => `${name} 为 ${this.focusedRecord[name]}`)
          .join(' 且 ')
        page.prompt.warn(
          page.state.l10n.deleteCheck,
          warning + ' ' +page.state.l10n.deleteWarning, 
          {
            确定: async () => {
              const success = await page.api.drop(this.focusedPKValues)
              if(success)
                this.putData()
            }
          }
        )
      },
      select1() { // 1
        this.fields.forEach( f => f.show = true )
      },
      select0() { // 0
        this.fields.forEach( f => f.show = false )
      },
      select_1() { // -1
        this.fields.forEach( f => f.show = !f.show )
      },
      terminal() {
        page.api2.openTerminal()
      },
      _undo() {
        this.pneOptions.editing = {}
      },
      undo() {
        page.prompt.warn(
          page.state.l10n.allUndo,
          page.state.l10n.forUndo, 
          {
            确定: async () => this._undo()
          }
        )
      },
      async save() {
        if(!this.isEditing)
          return page.noty.fatal(page.state.l10n.noDataForSave)
        const records = Object.entries(this.pneOptions.editing).map(
          ([y, changed]) => {
            const pk = {}
            for(const pkName of this.pkNames)
              pk[pkName] = this.records[y][pkName]
            return { pk, changed }
          }
        )
        const success = await page.api.update(records)
        if(success) {
          this._undo()
          this.refresh()
        }
      }
    },
    computed: {
      pks() { return this.fields.filter(f => f.pk) },
      pkNames() { return this.pks.map(f => f.name) },
      hasPK() {
        if(this.fields.length == 0)
          return undefined
        return this.pks.length > 0
      },
      focusedRecord() {
        if(this.pneOptions.focus.y !== undefined)
          return this.records[this.pneOptions.focus.y]
        return null
      },
      focusedPKValues() {
        if(this.pkNames.length == 0)
          throw Error('无主键')
        const result = {}
        for(const name of this.pkNames)
          result[name] = this.focusedRecord[name]
        return result
      },
      isEditing() { // 在状态改变时计算，不影响性能
        return Object.entries(this.pneOptions.editing).length > 0
      }
    },
    watch: {
      hasPK(nv, ov) {
        if(!nv)
          page.noty.warn(tableName + page.state.l10n.noPrimaryKey)
        else if(ov === false) // 现在有，且刚才没有
          page.noty.info(tableName + page.state.l10n.primaryKeyAdded)
      }
    },
    mounted() {
      if(page.noState)
        this.putData()
    }
  }
}, Nav, SearchItem)