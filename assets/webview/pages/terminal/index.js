import VuePage from '../../script/vue/page.js'

VuePage(function(page) {
  return {
    initData() {
      return {
        sql: ''
      }
    },
    methods: {
      async exec() {
        const result = await page.api.exec(this.sql)
      }
    }
  }
})