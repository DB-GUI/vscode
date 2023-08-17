const container_view = require('../../src/contribution/view_container').register
const view_about = require('../../src/contribution/view/about').register

module.exports = {
  viewsContainers: {
    activitybar: [container_view]
  },
  views: {
    [container_view.id]: [
      view_about,
    ]
  }
}
