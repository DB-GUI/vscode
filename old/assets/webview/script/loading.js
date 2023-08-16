import Icon from './icon/index.js'

let loading = 0

const icon = Icon('refresh')
icon.style.animation = 'spin linear infinite .6s'
icon.style.fontSize = '1.58rem'

const el = new function() {
  const result = document.createElement('div')
  result.className = 'ppz-loading'
  result.appendChild(icon)
  return result
}
el.style.position = 'fixed'
el.style.right = '1rem'
el.style.top = '1rem'

el.style.transition = '.18s ease all'
el.style.opacity = 0
el.style.transform = 'scale(0, 0)'

document.querySelector('body').appendChild(el)

export default {
  show() {
    loading ++
    console.debug('show', { loading })
    if(loading == 1) {
      el.style.opacity = .8
      el.style.transform = 'scale(1, 1)'
    }
  },
  hide() {
    setTimeout(() => {
      loading --
      console.debug('hide', { loading })
      if(loading == 0) {
        el.style.opacity = 0
        el.style.transform = 'scale(0, 0)'
      }
    }, 300)
  }
}