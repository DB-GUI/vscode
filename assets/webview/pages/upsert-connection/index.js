import VuePage from '../../script/vue/page.js'
import FormOptions from './form-options.js'

VuePage(function(page) {
  return {
    initData() {
      return FormOptions(PPZ.initData.editing)
    },
    methods: {
      select(key) {
        this.current = key
      },
      async save(connect) {
        await page.api.save({
          connect,
          record: this.getFormData()
        })
      },
      getFormData() {
        const form = this.forms.find(form => form.key == this.current)
        const result = {
          client: form.key,
          name: this.publicForm.name
        }
        if(PPZ.initData.editing)
          result.id = PPZ.initData.editing.id
        for(const field of form.fields)
          result[field.name] = field.value
        return result
      }
    }
  }
})