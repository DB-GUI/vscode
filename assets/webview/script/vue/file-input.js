import selectFile from '../../../../lib/vscode-utils/file-selector/client.js'
import { ref, watch } from './vue.esm-browser.prod.js'

export default {
  template: `
    <span class="file-input">
      <input v-model="value" @focus="select" @input="onInput">
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