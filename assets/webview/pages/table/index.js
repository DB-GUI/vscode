import VuePage from '../../script/vue/page.js'
import * as Nav from './nav.js'

VuePage(function(page) {
  const tableName = PPZ.initData.names[PPZ.initData.names.length - 1]

  return {
    initData() {
      return {
        selectParams: {
          page: { count: 0, size: 16, index: 1 }
        },
        fields: [],
        records: [],
        pneOptions: null
      }
    },
    methods: {
      async putData(isRefresh) {
        const { fields, records, count } = await page.api.getData(this.selectParams)
        this.selectParams.page.count = count
        this.setFields(fields)
        this.setRecords(records)
        if(isRefresh === true)
          page.noty.info('数据已刷新')
      },
      setFields(fields) {
        const oldMap = {}
        for(const f of this.fields)
          oldMap[f.name] = f
        for(const f of fields)
          f.show = oldMap[f.name] === undefined // 原来没有的要显示
                || oldMap[f.name].show // 原来显示的要显示
        this.fields = fields
      },
      setRecords(records) {
        this.pneOptions = {
          focus: {},
          editing: {}
        }
        this.records = records
      },

      beforePage(evt) {
        if(this.isEditing) {
          evt.stopPropagation()
          return page.noty.warn('请先保存或撤销修改')
        }
      },

      refresh() {
        if(this.isEditing) // 这里不能把按钮变灰，要不然用户不知道为什么灰
          return page.noty.warn('请先保存或撤销修改')
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
          return page.noty.warn('请先保存或撤销修改')
        const warning = this.pkNames
          .map(name => `${name} 为 ${this.focusedRecord[name]}`)
          .join(' 且 ')
        page.prompt.warn(
          '确定删除？',
          '您正在删除 ' + warning + ' 的记录，删除后不可恢复', 
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
          '撤销全部？',
          '您可以使用 ctrl-z(windows) 或 cmd-z(macos) 来撤销一小步', 
          {
            确定: async () => this._undo()
          }
        )
      },
      async save() {
        if(!this.isEditing)
          return page.noty.fatal('没有待保存的数据')
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
          page.noty.warn(tableName + ' 表缺少主键，不能进行编辑、删除操作')
        else if(ov === false) // 现在有，且刚才没有
          page.noty.info(tableName + ' 表已添加主键')
      }
    },
    mounted() {
      if(page.noState)
        this.putData()
    }
  }
}, Nav)