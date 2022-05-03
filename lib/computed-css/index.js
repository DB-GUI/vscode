export const config = {
  prefix: 'ppz-',
  getRoot: () => document.querySelector(':root')
}

const haha = /^rgba?\((\d+), (\d+), (\d+)(, (\d+))?\)$/
export function parseRGBA(rgba) {
  const result = haha.exec(rgba)
  if(!result) throw Error(rgba + ' is not a rgba value')
  return {
    red: result[1],
    green: result[2],
    blue: result[3],
    alpha: result[5] == undefined ? 1 : result[5]
  }
}

export function getComputed(...props) {
  const target = this instanceof HTMLElement ? this : config.getRoot()
  const computedStyle = getComputedStyle(target)
  return props.map(prop => {
    const result = parseRGBA(computedStyle[prop])
    result.prop = prop
    return result
  })
}

// 一次性接收多个参数的目的在于减少 dom 操作次数
export function putComputed(...props) {
  writeStyle(getComputed.apply(this, props))
}

// 内部方法的传参方式当然与外部不一样
export function writeStyle(vars) {
  const $style = document.createElement('style')
  $style.innerHTML = `:root{${
    vars.map(color => `--${
      config.prefix}${color.prop}-red:${color.red};--${
      config.prefix}${color.prop}-green:${color.green};--${
      config.prefix}${color.prop}-blue:${color.blue};--${
      config.prefix}${color.prop}-alpha:${color.alpha
    };`).join('')
  }}`
  document.head.appendChild($style)
}
