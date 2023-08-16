const { context } = require('esbuild')
const get_options = require('./index')

const options = get_options(true)
context(options)
.then(async ctx => {
  await ctx.watch() // 监听文件变化
})
.catch(err => {
  console.error('core dev: error on make context', err)
})