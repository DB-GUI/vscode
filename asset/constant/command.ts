import { meta_util } from 'src/util'

export
const key = {
  command: {
    connection: {
      add: meta_util.key_and('.connection.add')
    },
  },
  view: {
    id: {
      connection: meta_util.key_and('.connection'),
    },
  },
}
