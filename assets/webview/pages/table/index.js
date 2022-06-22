import VuePage from '../../script/vue/page.js'
import * as Nav from './nav.js'

VuePage(function(page) {
  return {
    initData() {
      return {
        selectParams: {
          page: {
            count: 0,
            size: 16,
            index: 1
          }
        },
        fields: [],
        records: []
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
        this.records = records
      }
    },
    mounted() {
      if(page.noState)
        this.putData()
    }
  }
}, Nav)