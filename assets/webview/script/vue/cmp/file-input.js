import selectFile from '../../../../../lib/vscode-utils/file-selector/client.js'
import { ref, watch } from '../vue.esm-browser.prod.js'

export const name = 'file-input'

export const options = {
  template: `
    <span class="file-input">
      <ppz-input v-model="value" @focus="select">
      <button @click="select">···</button>
    </span>
  `,
  props: ['modelValue'],
  setup(props, ctx) {
    const value = ref(props.modelValue)
    watch(props.modelValue, nv => value.value = nv)
    watch(value, nv => {
      ctx.emit('update:modelValue', nv)
    })

    return {
      value,
      async select() {
        const file = await selectFile()
        if(!file) return
        const path = file[0].path
        value.value = path
      }
    }
  }
}

export const style = `
  .file-input > input {
    width: 8rem;
    margin-left: 1rem;
    margin-right: .36rem;
  }
  .file-input > button {
    padding: 0;
    width: 2em;
    min-width: 2em;
  }
`