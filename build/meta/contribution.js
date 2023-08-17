const container_view = {
  id: 'ppz_view_container',
  title: 'PPz',
  icon: 'asset/icon/inherit.svg'
}
const view_about = {
  id: 'about',
  name: '%ppz.views.about.name%',
  icon: 'asset/icon/inherit.svg',
}
const view_connection = {
  id: 'connection',
  name: '%ppz.views.connection.name%',
  icon: 'asset/icon/inherit.svg',
}


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
