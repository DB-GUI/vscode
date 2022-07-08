import Page from '../page.js'
import { createApp } from './vue.esm-browser.prod.js'
import * as FileInput from './cmp/file-input.js'
import * as Icon from './cmp/icon.js'
import * as Input from './cmp/input.js'
import * as Pagination from './cmp/pagination.js'
import * as IconBtn from './cmp/icon-btn.js'
import * as Checkbox from './cmp/checkbox.js'
import * as PNE from './cmp/pne.js'
import * as HR from './cmp/hr.js'
import * as RadioGroup from './cmp/radio-group.js'
import Style from './style.js'

export default
function VuePage(getVueOptions, ...cmps) {
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
      cmps.push(
        Icon, IconBtn, FileInput, Input, Pagination,
        RadioGroup, Checkbox, PNE, HR
      )
      const styles = []
      for(const cmp of cmps) {
        if(!cmp.options.methods)
          cmp.options.methods = {}
        // 子组件不会触发 updated 的，需手动 save
        cmp.options.methods.$$page = () => page
        
        app.component(cmp.name, cmp.options)
        styles.push(cmp.style)
      }
      Style(styles)
      app.directive('focus', {
        mounted(el) {
          el.focus()
        }
      })
      app.mount('#vue-app')
    }
  }
}