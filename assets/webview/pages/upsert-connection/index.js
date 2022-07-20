import VuePage from '../../script/vue/page.js'

const F = (key, type) => ({ key, type })
const A = (name, label, urlSupport, keys) => ({ name, label, keys, urlSupport })

VuePage(function(page) {
  return {
    initData() {
      return {
        record: PPZ.initData.record || {
          name: '未命名连接',
          client: 'mysql',
          useUrl: 0,
          url: '',
        },
        fields: [
          F('host'),
          F('port'),
          F('user'),
          F('password'),
          F('database'),
          F('filename', 'file')
        ],
        adapters: [
          A('mysql', 'MySQL', true,
            ['host', 'port', 'user', 'password', 'database']),
          A('postgresql', 'PostgreSQL', true,
            ['host', 'port', 'user', 'password', 'database']),
          A('sqlite3', 'Sqlite3', false, ['filename']),
          A('cockroachdb', 'CockroachDB', true,
            ['host', 'port', 'user', 'password', 'database'])
        ]
      }
    },
    computed: {
      adapter() {
        return this.adapters.find(a => a.name == this.record.client)
      }
    },
    methods: {
      async save(connect) {
        const record = debugClone(this.record)
        if(record.useUrl)
          for(let f of this.fields)
            delete record[f.key]
        else {
          delete record.useUrl
          delete record.url
          for(let f of this.fields)
            if(this.adapter.keys.indexOf(f.key) === -1)
              delete record[f.key]
        }
        if(record.client == 'cockroachdb') {
          record.client = 'postgresql'
          record.isCockroach = true
        }
        await page.api.save({
          connect, record
        })
      }
    }
  }
})