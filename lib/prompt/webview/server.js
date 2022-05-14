const prompt = require('../index')

module.exports = function(data) {
  return prompt.simple[data.type](data.title, data.subtitle, data.btns)
}