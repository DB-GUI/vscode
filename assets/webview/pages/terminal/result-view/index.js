import Mysql from './mysql.js'
import Pgsql from './pgsql.js'
import Sqlite3 from './sqlite3.js'

export const name = 'result-view'

export const options = {
  props: ['data'],
  template: `
    <div class="result-view" v-if="data">
      <div class="error-view" v-if="data.error">
        <p>{{data.errString}}</p>
        <table class="ppz error" v-if="Object.values(data.rawError).length > 0">
          <thead>
            <tr>
              <th>KEY</th>
              <th>VALUE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in data.rawError">
              <td>{{key}}</td>
              <td>{{value}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <template v-else>
        <p>
          <span>已执行, 耗时 {{data.time}} ms</span>
          <span v-if="rows.records">, 共 {{rows.records.length}} 条结果</span>
        </p>
        <table class="ppz" v-if="rows.notQuery">
          <thead>
            <tr>
              <th>KEY</th>
              <th>VALUE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in rows.desc">
              <td>{{key}}</td>
              <td>{{value}}</td>
            </tr>
          </tbody>
        </table>
        <table v-else class="ppz" v-if="Object.values(rows).length > 0">
          <thead>
            <tr>
              <th v-for="f in rows.fields">{{f}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in rows.records">
              <td v-for="f in rows.fields">{{record[f]}}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  `,
  computed: {
    rows() {
      if(!this.data || !this.data.rawResponse) return
      return {
        mysql2: Mysql,
        pg: Pgsql,
        sqlite3: Sqlite3
      }[this.data.clientType].rows(this.data.rawResponse)
    }
  }
}

export const style = `
  .result-view .error-view {
    color: var(--vscode-errorForeground);
  }

`