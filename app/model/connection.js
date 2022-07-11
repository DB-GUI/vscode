const ArrayCollection = require('./collection/array')

class ConnectionCollection extends ArrayCollection {
  constructor() {
    super('connection')
  }

  validateOne(record) {
  }
}

module.exports = new ConnectionCollection()