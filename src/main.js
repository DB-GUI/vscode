const init_contribution = require('./contribution')

exports.activate = function(context) {
  init_contribution(context)
}
