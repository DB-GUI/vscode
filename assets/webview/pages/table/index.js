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
      refresh() {
        console.log('refreshing')
      },
      async putData() {
        const { fields, records, count } = await page.api.getData(this.selectParams)
        this.selectParams.page.count = count
        this.fields = fields
        this.records = records
      }
    },
    mounted() {
      this.putData()
    }
  }
}, Nav)