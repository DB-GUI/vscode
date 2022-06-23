export const name = 'ppz-pne'

export const options = {
  props: ['fields', 'records'],
  template: `
    <table class="pne">
      <thead>
        <tr>
          <template v-for="field in fields">
            <th v-if="field.show" :title="field.type">{{field.name}}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records">
          <template v-for="field in fields">
            <td v-if="field.show" :title="field.name + ': ' + field.type">{{record[field.name]}}</td>
          </template>
        </tr>
      </tbody>
    </table>
  `
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
  .pne th, td {
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
`