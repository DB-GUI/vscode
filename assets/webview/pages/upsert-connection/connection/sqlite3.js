import Connection from './index.js'

export default class Sqlite3Connection extends Connection {
  constructor() {
    super('SQLite3', 'sqlite3', [
      { name: 'filepath', required: true, file: true }
    ])
  }
}