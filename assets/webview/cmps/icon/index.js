import './iconfont.js'

export default function Icon(id) {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-${id}"></use>
    </svg>
  `
  return wrapper.children[0]
}