export const name = 'ppz-pne'

export const options = {
  props: ['fields', 'records', 'options', 'editable'],
  template: `
    <table class="pne">
      <thead>
        <tr>
          <template v-for="(f, i) in fields">
            <th v-if="f.show" :title="f.type" :class="{ highlight: options.focus.x == i }">{{f.name}}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, j) in records" :class="{ highlight: options.focus.y == j }">
          <template v-for="(f, i) in fields">
            <td
              v-if="f.show"
              @click="setFocus(i, j)"
              :class="{ highlight: options.focus.x == i }"
              :title="f.name + ': ' + f.type"
              :contenteditable="editable"
              @input="input(j, f.name, $event.target.innerText)"
            >{{
              (options.editing[j] && (options.editing[j][f.name] !== undefined))
              ? options.editing[j][f.name]
              : record[f.name]
            }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  `,
  methods: {
    setFocus(i, j) {
      this.options.focus.x = i
      this.options.focus.y = j
      this.$$page().saveState()
    },
    input(y, fieldName, value) {
      if(!this.options.editing[y])
        this.options.editing[y] = {}
      this.options.editing[y][fieldName] = value
      this.$$page().saveState()
    }
  }
}

export const style = `
  table.pne {
    border-collapse: collapse;
  }
  .pne thead {
    position: sticky;
    top: 0;
    background: rgba(var(--color1), .1);
  }
  .pne tbody tr:nth-child(even) {
    background: rgba(var(--color1), .06);
  }
  .pne tr > *:first-child {
    padding-left: 1em;
  }
  .pne th, .pne td {
    padding: 0 .5em;
    max-width: 16em;
    height: 2em;
    line-height: 2;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .pne th {
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .pne td {
    cursor: cell;
    outline: none;
  }
  .pne td:hover {
    background: rgba(var(--color1), .1);
  }

  .pne tr.highlight {
    background: rgba(var(--color1), .1) !important;
  }
  .pne th.highlight, .pne td.highlight {
    background: rgba(var(--color1), .1);
  }
`