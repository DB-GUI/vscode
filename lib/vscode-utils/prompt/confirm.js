const prompt = require('./index')

exports.confirm = new Proxy(prompt, {
  get(prompt, type) {
    return async (title, subtitle, btnTxt = '确定') =>
      btnTxt == await prompt.simple[type](title, subtitle, [btnTxt])
  }
})

exports.warn = async function() {
  return !await exports.confirm.warn(...arguments)
}