const collection = require('../model/connection')

const service = module.exports = Object.create(collection)

service.connect = function(id) {
  console.debug('connecting to ' + id)
}