import $ from '../script/ppz-query.js'

export default function Button(label, onclick) {
  const button = $.El('button', '', [label])
  button.onclick = onclick
  return button
}