import Mysql from './mysql.js'
import Pgsql from './pgsql.js'
import Sqlite3 from './sqlite3.js'
import Mssql from './mssql.js'

export const name = 'result-view'

export const options = {
  components: {
    'kv-table': {
      props: ['data'],
      template: `
        <table class="ppz">
          <thead>
            <tr>
              <th>KEY</th>
              <th>VALUE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in data">
              <td tabindex="-1">{{key}}</td>
              <td tabindex="-1">{{value}}</td>
            </tr>
          </tbody>
        </table>
      `
    },
    'data-table': {
      props: ['data'],
      template: `
        <div class="table-wrapper">
          <table v-else class="ppz">
            <thead>
              <tr>
                <th v-for="f in data.fields">{{f}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in data.records">
                <td v-for="f in data.fields" tabindex="-1">{{record[f]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    }
  },
  props: ['result'],
  template: `
    <div class="result-view" v-if="result">
      <div class="error-view" v-if="result.error">
        <p>{{result.errString}}</p>
        <kv-table class="error" :data="result.rawError" 
          v-if="Object.values(result.rawError).length > 0" />
      </div>
      <template v-else>
        <p>
          <span>已执行, 耗时 {{result.time}} ms</span>
          <span v-if="data.records">, 共 {{data.records.length}} 条结果</span>
        </p>
        <template v-if="data instanceof Array">
          <!-- 多条 sql -->
          <details v-for="(dd, index) in data">
            <summary>
              <span>No.{{index + 1}}</span>
              <span v-if="dd.records">共  {{dd.records.length}} 条结果</span>
            </summary>
            <kv-table v-if="dd.notQuery" :data="dd.desc" />
            <data-table v-else-if="Object.values(dd.records).length > 0" :data="dd" />
          </details>
        </template>
        <template v-else>
          <!-- 单条 sql -->
          <kv-table v-if="data.notQuery" :data="data.desc" />
          <data-table v-else-if="Object.values(data.records).length > 0" :data="data" />
        </template>
      </template>
    </div>
  `,
  computed: {
    data() {
      if(!this.result || !this.result.rawResponse) return
      // PPZ_ADAPTER
      return {
        mysql2: Mysql,
        pg: Pgsql,
        cockroachdb: Pgsql,
        mssql: Mssql,
        sqlite3: Sqlite3
      }[this.result.driveName].rows(this.result.rawResponse)
    }
  }
}

export const style = `
  .result-view .error-view {
    color: var(--vscode-errorForeground);
  }
  .result-view summary {
    line-height: 2.5em;
    padding: 0 .8em;
    background: rgba(var(--color1), .2);
  }
  .result-view summary:hover {
    background: rgba(var(--color1), .3);
  }
  .result-view summary span {
    margin-left: .6em;
  }
`