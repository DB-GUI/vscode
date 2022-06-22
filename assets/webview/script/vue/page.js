import Page from '../page.js'
import { createApp } from './vue.esm-browser.prod.js'
import FileInput from './file-input.js'
import Icon from './icon/index.js'
import { inputOptions, inputStyle } from './cmp/input.js'
import Style from './style.js'

export default
function VuePage(getVueOptions) {
  new class extends Page {
    init(page) {
      const options = getVueOptions(page)
      // state 初始化
      if(!page.state) {
        page.state = options.initData()
        page.saveState()
      }
      delete options.initData
      options.data = () => page.state
      // updateState
      options.updated = function() {
        page.saveState()
      }
      
      const app = createApp(options)
      app.component('file-input', FileInput)
      app.component('ppz-icon', Icon)
      app.component('ppz-input', inputOptions)
      Style(
        inputStyle,
      )
      app.mount('#vue-app')
    }
  }
}