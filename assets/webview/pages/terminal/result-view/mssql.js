export default {
  rows(rawResponse) {
    const record = rawResponse[0]
    if(!record)
      return {
        fields: [],
        records: []
      }
  
    const fields = []
    for(let key in record)
      fields.push(key)
    return {
      fields,
      records: rawResponse
    }
  }
}