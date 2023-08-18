const vscode = require('vscode')
const { v4: UUID } = require('uuid')
const { logger } = require('../util')
const State = require('./state')
const List_state = require('./list_state')

/** @param {vscode.ExtensionContext} context */
module.exports = async context => {
  const key = {
    system: 'system',
    connection: 'connection',
  }
  const raw_state = context.globalState

  const migrate = async () => {
    logger.debug('migrating')
    switch(raw_state.get(key.system)?.version) {
      case undefined:
        logger.debug('new install')
        await raw_state.update(key.system, {
          version: '0.0.0'
        })
        return migrate() // next migration
      case '0.0.0':
        logger.debug('0.0.0')
        await raw_state.update(key.system, {
          version: '0.5.0'
        })
        const records = raw_state.get(key.connection, [])
        records.forEach(record => {
          record._id = UUID()
          delete record.id
        })
        await raw_state.update(key.connection, records)
        return migrate() // next migration
      case '0.5.0':
        logger.debug('0.5.0, latest, no migration')
        return
    }
  }
  await migrate()

  return {
    system: new State(raw_state, key.system),
    connection: new List_state(raw_state, key.connection),
  }
}
