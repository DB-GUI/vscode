const container_view = require('../../src/contribution/view_container').register
const view_about = require('../../src/contribution/view/about').register
const view_connection = require('../../src/contribution/view/connection').register

view_about.name = '%ppz.views.about.name%'
view_connection.name = '%ppz.views.connection.name%'

module.exports = {
  viewsContainers: {
    activitybar: [container_view]
  },
  views: {
    [container_view.id]: [
      view_connection,
      view_about,
    ]
  },
  viewsWelcome: [
    {
      view: view_connection.id,
      contents: '%ppz.views.connection.welcome%'
    },
    {
      view: view_about.id,
      contents: '%ppz.views.about.welcome%'
    }
  ]
}
