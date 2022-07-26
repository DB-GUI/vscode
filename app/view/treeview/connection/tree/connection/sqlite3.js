const { TableElement } = require('../base')
const ConnectionElement = require('./base')

class Sqlite3Element extends ConnectionElement {
  get isSchema() { return true }
  get isSqlite3Element() { return true }
  constructor(rootElement, options) {
    super(rootElement, options, 'sqlite3Connection')
  }

  async _getChildren2() {
    const tbList = await this.connection.tbList()
    return tbList.map(tb => new TableElement(this, null, tb.name, [this.name, tb.name], this.connection))
  }
}
exports.Sqlite3Element = Sqlite3Element