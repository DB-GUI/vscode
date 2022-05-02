export const config = {
  prefix: 'ppz-'
}

export function getColor(...props) {
  const computedStyle = getComputedStyle(document.querySelector(':root'))
  const haha = /^rgba?\((\d+), (\d+), (\d+)(, (\d+))?\)$/
  return props.map(prop => {
    const result = haha.exec(computedStyle[prop])
    if(!result) throw Error(prop + ' is not a color')
    return {
      prop,
      red: result[1],
      green: result[2],
      blue: result[3],
      alpha: result[5] == undefined ? 1 : result[5]
    }
  })
}

export default function ColorValue(...props) {
  const $style = document.createElement('style')
  $style.innerHTML = `:root{${
    getColor(...props).map(color => `--${
      config.prefix}${color.prop}-red:${color.red};--${
      config.prefix}${color.prop}-green:${color.green};--${
      config.prefix}${color.prop}-blue:${color.blue};--${
      config.prefix}${color.prop}-alpha:${color.alpha
    };`).join('')
  }}`
  document.head.appendChild($style)
}