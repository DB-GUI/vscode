export function El(tagname, className, children) {
  // /** @type {HTMLElement} */
  const $el = document.createElement(tagname)
  if(className)
    $el.className = className
  if(children)
    $el.append(...children)
  return $el
}

export function Div(className, children) {
  return El('div', className, children)
}

export function Span(txt, className) {
  return El('span', className, [txt])
}

export function Icon(id) {
  const wrapper = Div()
  wrapper.innerHTML = `
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-${id}"></use>
    </svg>
  `
  return wrapper.children[0]
}

export function Button(label, onclick) {
  const button = El('button', '', [label])
  button.onclick = onclick
  return button
}