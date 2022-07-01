const { TableElement } = require('../base')
const ConnectionElement = require('./base')

class Sqlite3Element extends ConnectionElement {
  constructor(rootElement, options) {
    super(rootElement, options, 'sqlite3Connection')
  }

  async _getChildren2() {
    const tbList = await this.connection.tbList()
    return tbList.map(name => new TableElement(this, null, name, [this.name, name], this.connection))
  }
}
exports.Sqlite3Element = Sqlite3Element