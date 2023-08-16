import prompt from './index'

export
const confirm = new Proxy(prompt, {
  get(prompt, type) {
    return async (title, subtitle, btnTxt = '确定') =>
      btnTxt == await prompt.simple[type](title, subtitle, [btnTxt])
  }
})

export
async function warn() {
  return !await confirm.warn(...arguments)
}