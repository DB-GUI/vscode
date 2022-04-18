import Connection from './index.js'

export default class Sqlite3Connection extends Connection {
  constructor() {
    super('MySQL', [
      { name: 'filepath', required: true, file: true }
    ])
  }
}