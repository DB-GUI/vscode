export const inputOptions = {
  props: ['modelValue'],
  template: `
    <span class="ppz-input">
      <input class="reset-style" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </span>
  `
}

export const inputStyle = `
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
    width: 100%;
    height: 100%;
    background: currentColor;
    opacity: .05;
  }
`