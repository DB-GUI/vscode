import VuePage from '../../script/vue/page.js'

const F = (key, type) => ({ key, type })
const A = (name, label, urlSupport, keys) => ({ name, label, keys, urlSupport })

VuePage(function (page) {
  return {
    initData() {
      return {
        pageName: 'upsertConnection',
        record: PPZ.initData.record || {
          name: 'Connection Name',
          client: 'mysql',
          useUrl: 0,
          url: '',
          host:'',
          port:'',
          user:'',
          password:'',
          database:'',
          filename:'',
          file:''
        },
        fields: [
          F('host'),
          F('port'),
          F('user'),
          F('password'),
          F('database'),
          F('filename', 'file')
        ],
        // PPZ_ADAPTER
        adapters: [
          A('mysql', 'MySQL', true,
            ['host', 'port', 'user', 'password', 'database']),
          A('mssql', 'SQL Server', false,
            ['host', 'port', 'user', 'password', 'database']),
          A('postgresql', 'PostgreSQL', true,
            ['host', 'port', 'user', 'password', 'database']),
          A('sqlite3', 'Sqlite3', false, ['filename']),
          A('cockroachdb', 'CockroachDB', true,
            ['host', 'port', 'user', 'password', 'database'])
        ],
        list:[{ label: '字段', value: 0 }, { label: 'URL', value: 1 }],
        dictionary:{}
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
        if (record.useUrl)
          for (let f of this.fields)
            delete record[f.key]
        else {
          delete record.useUrl
          delete record.url
          for (let f of this.fields)
            if (this.adapter.keys.indexOf(f.key) === -1)
              delete record[f.key]
        }
        await page.api.save({
          connect, record
        })
      },
    },
    created: function () {
      this.record.name = page.state.l10n.defaultConnectionName
      this.adapters = [
        A('mysql', 'MySQL', true,
          [page.state.l10n.host, page.state.l10n.port, page.state.l10n.username, page.state.l10n.password, page.state.l10n.databaseName]),
        A('mssql', 'SQL Server', false,
          [page.state.l10n.host, page.state.l10n.port, page.state.l10n.username, page.state.l10n.password, page.state.l10n.databaseName]),
        A('postgresql', 'PostgreSQL', true,
          [page.state.l10n.host, page.state.l10n.port, page.state.l10n.username, page.state.l10n.password, page.state.l10n.databaseName]),
        A('sqlite3', 'Sqlite3', false, [page.state.l10n.filename]),
        A('cockroachdb', 'CockroachDB', true,
          [page.state.l10n.host, page.state.l10n.port, page.state.l10n.username, page.state.l10n.password, page.state.l10n.databaseName])
      ]
      this.fields = [
        F(page.state.l10n.host),
        F(page.state.l10n.port),
        F(page.state.l10n.username),
        F(page.state.l10n.password),
        F(page.state.l10n.databaseName),
        F(page.state.l10n.filename, page.state.l10n.file)
      ]
      this.list = [{ label: page.state.l10n.connectionInfo, value: 0 }, { label: 'URL', value: 1 }]

      const hostKey = page.state.l10n.host
      const portKey = page.state.l10n.port
      const usernameKey = page.state.l10n.username
      const passwordKey = page.state.l10n.password
      const databaseNameKey = page.state.l10n.databaseName
      const filenameKey = page.state.l10n.filename
      const fileKey = page.state.l10n.file
      this.dictionary = {
        [hostKey]:'host',
        [portKey]:'port',
        [usernameKey]:'user',
        [passwordKey]:'password',
        [databaseNameKey]:'database',
        [filenameKey]:'filename',
        [fileKey]:'file'
      }
    }
  }
})