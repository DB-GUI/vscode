import $ from '../../script/ppz-query.js'
import Mysql from './connection/mysql.js'
import Sqlite3 from './connection/sqlite3.js'

export default function Form(state) {
  // 初始化：当前选中状态
  var selectedIndex = state.value
    ? conns.findIndex(conn => conn.client == state.value.client)
    : 0
  // 所有连接
  const conns = [
    Mysql,
    Sqlite3
  ].map(
    (Connection, index) =>
      Connection(function onSelect(data) {
        state.value = data
        conns[selectedIndex].$el.classList.remove('selected') // 旧的去除
        selectedIndex = index
        conns[selectedIndex].$el.classList.add('selected') // 新的添加
      })
  )

  // 设置初始选中状态
  conns[selectedIndex].select()

  return $.Div('form', conns.map(conn => conn.$el))
}