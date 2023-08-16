export default {
  rows(raw) {
    if(raw instanceof Array)
      return raw.map(this.rows)
    return raw.command == 'SELECT'
      ? {
        fields: raw.fields.map(f => f.name),
        records: raw.rows
      }
      : {
        notQuery: true,
        desc: raw
      }
  }
}