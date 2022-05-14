export default function(request, apiName = 'prompt') {
  return new Proxy({}, {
    get(target, type) {
      return async function(title, subtitle, btns) {
        const result = await request(apiName, {
          type, title, subtitle,
          btns: Object.keys(btns)
        }, {
          timeout: 0
        })
        if(result) {
          await btns[result]()
          return result
        }
      }
    }
  })
}