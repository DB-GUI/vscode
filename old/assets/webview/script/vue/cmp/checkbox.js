export const name = 'ppz-checkbox'

export const options = {
  props: ['modelValue', 'label'],
  template: `
    <label class="ppz-checkbox">
      <input type="checkbox" @change="$emit('update:modelValue', $event.target.checked)" :checked="modelValue" />
      <span>{{label}}</span>
    </label>
  `
}

export const style = `
  label.ppz-checkbox {
    display: inline-flex;
    align-items: center;
  }
  label.ppz-checkbox input {
    margin: 0;
    height: 1em;
    margin-right: .38em;
  }
  label.ppz-checkbox span {
    line-height: 1;
  }
`