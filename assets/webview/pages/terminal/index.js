import VuePage from '../../script/vue/page.js'
import * as ResultView from './result-view/index.js'

VuePage(function(page) {
  return {
    initData() {
      return {
        pageName: 'terminal',
        sql: PPZ.initData.initSQL || '',
        clientName: PPZ.initData.clientName,
        result: null
      }
    },
    methods: {
      async exec() {
        this.result = null
        this.result = await page.api.exec(this.sql)
        // console.log(JSON.parse(JSON.stringify(this.result)))
      },
      keydown({ ctrlKey, key }) {
        if(ctrlKey && key == 'Enter')
          this.exec()
      },
      testFunction() {
        const test2 = page.state.l10n.sqlite3tip
        console.debug("PPZ.state:",PPZ)
        console.debug("page.state.l10n:",page.state.l10n)
        console.debug("test2:",test2)
      }
    }
  }
}, ResultView)