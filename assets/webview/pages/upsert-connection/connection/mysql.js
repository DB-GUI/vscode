import Connection from './index.js'

export default class MysqlConnection extends Connection {
  constructor() {
    super('MySQL', [
      { name: 'host', required: true },
      { name: 'port' },
      { name: 'user', required: true },
      { name: 'password', required: true },
      { name: 'database' }
    ])
  }
}