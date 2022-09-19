const { set } = require('@ppzp/context')
const main = require('./service/main')

exports.activate = function(context) {
  set(context)
  main()
}
