import VuePage from '../../script/vue/page.js'
import * as Nav from './nav.js'

VuePage(function(page) {
  return {
    initData() {
      return {}
    },
    methods: {
      refresh() {
        console.log('refreshing')
      }
    }
  }
}, Nav)