export const name = 'ppz-input'

export const options = {
  props: ['modelValue', 'textarea'],
  template: `
    <span class="ppz-input">
      <component :is="textarea?'textarea':'input'" class="reset-style" :value="modelValue"
        @focus="$emit('focus', $event)"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </span>
  `
}

export const style = `
  .ppz-input {
    position: relative;
  }
  .ppz-input::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;

    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    background: currentColor;
    opacity: .05;
  }
  .ppz-input input, .ppz-input textarea {
    border: 1px solid transparent;
    color: inherit;
    height: 2em;
    width: 100%;
    padding: 0 .5em;
    outline: none;
  }
  .ppz-input textarea {
    padding: .5em;
    line-height: 1.5em;
    height: 4em;
    display: block;
  }
  .ppz-input input:focus, .ppz-input textarea:focus {
    border: var(--border-focus);
  }
`