import VuePage from '../../script/vue/page.js'
import * as Nav from './nav.js'

VuePage(function(page) {
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
      async putData() {
        const { fields, records, count } = await page.api.getData(this.selectParams)
        this.selectParams.page.count = count
        this.setFields(fields)
        this.setRecords(records)
      },
      setFields(fields) {
        for(const f of fields)
          f.show = true
        this.fields = fields
      },
      setRecords(records) {
        this.pneOptions = {
          focus: {},
          editing: new Map()
        }
        this.records = records
      },

      newRecord(copy) {
        const data = {
          fields: this.fields
        }
        if(copy) {
          if(this.pneOptions.focus.y !== undefined)
            data.record = this.records[this.pneOptions.focus.y]
          else {
            page.noty.warn('请先点击想要拷贝的记录')
            return
          }
        }
        page.api.newRecord(data)
      }
    },
    mounted() {
      if(page.noState)
        this.putData()
    }
  }
}, Nav)