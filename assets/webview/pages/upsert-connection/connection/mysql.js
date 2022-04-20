import Connection from './index.js'

export default function MysqlConnection(onSelect) {
  return new Connection('MySQL', 'mysql', onSelect, [
    { name: 'host', required: true },
    { name: 'port' },
    { name: 'user', required: true },
    { name: 'password', required: true },
    { name: 'database' }
  ])
}