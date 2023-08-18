const FS = require('fs')
const { build } = require('esbuild')

const meta = require('./meta/')
const core = require('./core/')

// 开发模式
const is_dev = true

function main() {
  // 1. 创建 dist 文件夹
  try {
    FS.mkdirSync('dist')
  } catch(err) {
    console.debug('info: 文件夹 dist 未创建') // 有可能是创建好了，所以失败也没事
    // console.error(err)
  }
  // 2. meta
  meta()
  // 3. core
  build(core(is_dev))
}
main()
