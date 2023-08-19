import { v4 as UUID } from 'uuid'
import { logger } from '@/util'

export default
async function migrate(state) {
  logger.debug('migrating')
  switch(state.get('system')?.version) {
    case undefined:
      logger.debug('new install')
      await state.update('system', {
        version: '0.0.0'
      })
      return migrate(state) // next migration
    case '0.0.0':
      logger.debug('0.0.0')
      await state.update('system', {
        version: '0.5.0'
      })
      const records = state.get('connection', [])
      records.forEach(record => {
        record._id = UUID()
        delete record.id
      })
      await state.update('connection', records)
      return migrate(state) // next migration
    case '0.5.0':
      logger.debug('0.5.0, latest, no migration')
      return
  }
}
