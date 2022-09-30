import VuePage from '../../script/vue/page.js'
import * as ResultView from './result-view/index.js'

const tip = {
  sqlite3: '* sqlite3 每次仅可执行一条 sql（输入多条 sql 将只执行第一条）'
}[PPZ.initData.clientName]

VuePage(function(page) {
  return {
    initData() {
      return {
        sql: PPZ.initData.initSQL || '',
        tip,
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
      }
    }
  }
}, ResultView)