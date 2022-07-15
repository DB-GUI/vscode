export const name = 'search-item'

const operators = [
  '=',
  ['!=', 'not'],
  '>',
  '>=',
  '<',
  '<=',
  'like',
  'in',
  ['not in', 'notIn'],
  'null',
  ['not null', 'notNull']
]

export const options = {
  props: ['fields', 'field', 'operator', 'value'],
  data() {
    return {
      operators
    }
  },
  template: `
    <div class="search-item">
      <select class="field">
        <option v-for="f in fields">{{f.name}}</option>
      </select>
      <select class="operator">
        <template v-for="op in operators">
          <option v-if="op instanceof Array" :value="op[1]">{{op[0]}}</option>
          <option v-else>{{op}}</option>
        </template>
      </select>
    </div>
  `
}

export const style = `
  .search-item {
    display: flex;
    align-items: center;
  }
  .search-item > .field {
    width: 12em;
  }
  .search-item > .operator {
    width: 5em;
  }
`

export
function newItemData() {
  return {
    field: null,
    operator: null,
    value: null
  }
}