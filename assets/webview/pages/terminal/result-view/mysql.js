export default {
  errReference: 'https://github.com/mysqljs/mysql#error-handling',
  rows(raw) {
    if(!raw[1]) // 单条 sql，非 query
      return {
        show: false,
        notQuery: true,
        desc: raw[0]
      }
    else if(raw[1][0] && raw[1][0].columnType) // 单条 sql，query
      return {
        show: false,
        fields: raw[1].map(item => item.name),
        records: raw[0]
      }
    else { // 多条 query，递归一下
      const result = []
      for(let i in raw[0])
        result.push([raw[0][i], raw[1][i]])
      return result.map(this.rows)
    }
  }
}