import { Div } from '../../../../lib/dom/index.js'
import Page from '../../script/vue/page.js'
import FormOptions from './form-options.js'

new class extends Page {
  initVue(page) {
    if(!page.state) {
      page.state = FormOptions(PPZ.initData.editing)
      page.saveState() // 这样虽然繁琐，但省掉了“理解”成本
    }

    return [
      Div('flex-container'),
      {
        data() {
          return page.state
        },
        template: `
          <div class="form-container">
            <div class="client-selector">
              <button
                v-for="form in forms"
                :class="{ selected: current == form.key }"
                @click="select(form.key)"
              >{{form.label}}</button>
            </div>
            <div class="forms">
              <div class="public form">
                <label>
                  <span>name</span>
                  <input v-model="publicForm.name" />
                </label>
              </div>
              <template v-for="form in forms">
                <div class="private form" v-show="form.key == current">
                  <label v-for="field in form.fields">
                    <span>{{field.name}}</span>
                    <input v-model="field.value" />
                  </label>
                </div>
              </template>
            </div>
          </div>
          <div class="form-btns">
            <button @click="save(true)">保存并连接</button>
            <button @click="save()">保存</button>
          </div>
        `,
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
    ]
  }
}