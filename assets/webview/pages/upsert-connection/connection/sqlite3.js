import Connection from './index.js'

export default function Sqlite3Connection(onSelect) {
  return new Connection('SQLite3', 'sqlite3', onSelect, [
    { name: 'filepath', required: true, file: true }
  ])
}