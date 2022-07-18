export const name = 'search-item'

const operators = [
  '=',
  '!=',
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
      <select class="field" v-model="field" @change="emitField($event.target.value)">
        <option v-for="f in fields">{{f.name}}</option>
      </select>
      <select class="operator" v-model="operator" @change="emitOperator($event.target.value)">
        <template v-for="op in operators">
          <option v-if="op instanceof Array" :value="op[1]">{{op[0]}}</option>
          <option v-else>{{op}}</option>
        </template>
      </select>

      <input v-if="isPlain(operator)" ref="input" v-model="value" @input="emitValue($event.target.value)" />

      <icon-btn iid="delete" class="round destroy" @click="$emit('destroy')"></icon-btn>
    </div>
  `,
  watch: {
    operator(nv) {
      if(nv == 'like' && !this.value) {
        this.emitValue('%%')
        this.$refs.input.focus()
      }
    }
  },
  methods: {
    isPlain(op) {
      return ['=', '!=', '>', '>=', '<', '<=', 'like'].indexOf(op) > -1
    },
    emitField(f) {
      this.$emit('update:field', f)
    },
    emitOperator(op) {
      this.$emit('update:operator', op)
    },
    emitValue(v) {
      this.$emit('update:value', v)
    }
  },
  mounted() {
    if(this.field == null)
      this.emitField(this.fields[0].name)
    if(this.operator == null)
      this.emitOperator(operators[0])
  }
}

export const style = `
  .search-item {
    display: flex;
  }
  .search-item > *:not(:last-child) {
    margin-right: 1em;
  }
  .search-item select, .search-item input {
    height: 2em;
    background-color: transparent;
    appearance: none;
    outline: none;
    border: 1px solid rgba(var(--color1), .3);
    color: rgba(var(--color1), 1);
    border-radius: 1em;
  }
  .search-item select:focus, .search-item input:focus {
    border: var(--border-focus);
  }
  .search-item select option {
    color: initial;
    text-align: center;
  }
  .search-item > .field {
    width: 12.31em;
  }
  .search-item > .operator {
    width: 3.8em;
  }
  .search-item > .operator + *:not(button) {
    width: 12em;
    flex: 1;
  }
  .search-item button.destroy {
    opacity: .5;
    background: transparent;
    transition: all .1s ease;
    margin-left: -.5em;
  }
  .search-item button.destroy:hover {
    opacity: 1;
    background: rgba(var(--color1), .1);
  }

  .search-item > input {
    padding: 0 .8em;
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