export default {
  errReference: 'https://github.com/mysqljs/mysql#error-handling',
  rows(raw) {
    return raw[1]
      ? {
        fields: raw[1].map(item => item.name),
        records: raw[0]
      }
      : {
        notQuery: true,
        desc: raw[0]
      }
  }
}