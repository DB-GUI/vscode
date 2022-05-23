const noty = require('../index')

module.exports = function({ type, msg, btns }) {
  const result = noty[type](msg, btns)
  if(btns.length)
    return result
}