const prompt = require('./index')

module.exports = new Proxy(prompt, {
  get(prompt, type) {
    return async (title, subtitle, btnTxt = '确定') =>
      btnTxt == await prompt.simple[type](title, subtitle, [btnTxt])
  }
})