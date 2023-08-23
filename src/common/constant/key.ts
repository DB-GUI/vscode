import util_meta from '../util_meta'

export default {
  command: {
    connection: {
      add: util_meta.key_and('.connection.add')
    },
  },
  view: {
    id: {
      connection: util_meta.key_and('.connection'),
    },
  },
}
