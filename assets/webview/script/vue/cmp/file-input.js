import selectFile from '../../../../../lib/vscode-utils/file-selector/client.js'

export const name = 'file-input'

var selecting = false

export const options = {
  props: ['modelValue'],
  template: `
    <ppz-input v-model="modelValue" @focus="select" />
  `,
  methods: {
    async select() {
      if(selecting) {
        console.error('already in selecting')
        return
      }
      selecting = true
      
      const file = await selectFile()
      selecting = false
      if(!file) return
      this.$emit('update:modelValue', file[0].path)
    }
  }
}