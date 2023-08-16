import VuePage from '../../script/vue/page.js'

VuePage(function(page) {
  return {
    initData() {
      return {
        pageName: 'newRecord',
        record: PPZ.initData.data.record || {},
        fields: PPZ.initData.data.fields
      }
    },
    methods: {
      save(closeAfterInserted) {
        page.api.insert({
          closeAfterInserted,
          record: this.record
        })
      }
    },
    created: function(){
      console.debug("page:",page)
      console.debug("PPZ",PPZ)
    }
  }
})