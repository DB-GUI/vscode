export default {
  rows(raw) {
    if(raw instanceof Array)
      raw = raw[raw.length - 1]
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