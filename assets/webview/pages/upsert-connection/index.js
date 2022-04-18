import $ from '../../script/ppz-query.js'
import Page from '../../script/page.js'
import Mysql from './connection/mysql'
import Sqlite3 from './connection/sqlite3'

new Page({
  initState() {
    return {
      data: PPZ.initData
    }
  },
  init() {
    
  }
})
