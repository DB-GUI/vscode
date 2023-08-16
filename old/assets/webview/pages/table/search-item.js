export const name = 'search-item'

const operators = [
  '=', '!=', '>', '>=', '<', '<=', 'like',
  'in', 'not in',
  'null', 'not null'
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
          <option v-else>{{op}}</option>
        </template>
      </select>

      <input
        v-if="['=', '!=', '>', '>=', '<', '<=', 'like'].indexOf(operator) > -1"
        ref="input" v-model="value" @input="emitValue($event.target.value)"
      />
      <div class="input-array" v-else-if="['in', 'not in'].indexOf(operator) > -1">
        <div class="input-array-item" v-for="(vv, index) in value">
          <input :value="vv"
            @input="value[index] = $event.target.value; emitValue(value)"
          />
          <icon-btn iid="error" class="round"
            @click="value.splice(index, 1); emitValue(value)"
          />
        </div>
        <icon-btn iid="add" class="round add-array-item"
          @click="value.push(''); emitValue(value)"
        />
      </div>
      <div class="filler" v-else />
      <icon-btn iid="error" class="round" @click="$emit('destroy')"></icon-btn>
    </div>
  `,
  watch: {
    operator(nv, ov) {
      const isArray = item => ['in', 'not in'].indexOf(item) > -1
      this.$nextTick().then(() => {
        if(nv == 'like' && (!this.value || this.value instanceof Array)) {
          this.emitValue('%%')
          this.$refs.input.focus()
        } else if(isArray(nv) && !isArray(ov)) {
          this.emitValue([''])
        } else if(!isArray(nv) && isArray(ov)) {
          this.emitValue('')
        }
      })
    }
  },
  methods: {
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
  .search-item select, .search-item input {
    height: 2em;
    color: inherit;
    text-align: center;
    border: 1px solid rgba(var(--color1), .3);
    border-radius: 1em;

    background-color: transparent;
    appearance: none;
    outline: none;
  }
  .search-item select:focus, .search-item input:focus {
    border: var(--border-focus);
  }
  .search-item select option {
    color: initial;
  }
  .search-item button.icon-btn {
    opacity: .5;
    background: transparent;
    transition: all .1s ease;
  }
  .search-item button.icon-btn:hover {
    opacity: 1;
    background: rgba(var(--color1), .1);
  }
  
  /* 上面是通用元素样式，下面是具体元素样式 */

  .search-item {
    display: flex;
  }
  .search-item > .field {
    margin-right: 1em;
    width: 12.31em;
  }
  .search-item > .operator {
    margin-right: 1em;
    width: 3.8em;
  }
  .search-item > .operator + *:not(button) {
    width: 12em;
    flex: 1;
  }

  .search-item > input {
    margin-right: .5em;
  }

  .search-item .input-array-item {
    display: flex;
    margin-bottom: .8em;
  }
  .search-item .input-array-item input {
    margin-right: .5em;
    width: 2em;
    flex: 1;
  }
  .search-item .add-array-item {
    margin: 0 auto;
    display: block;
  }
`

export
function newItemData() {
  return {
    field: null,
    operator: null,
    value: ''
  }
}