const FS = require('fs')
const Path = require('path')
const { build } = require('esbuild')

const package_json = require('./package.json/')
const core = require('./core/')

// 尽量用相对路径
const abs_path = relative_path => Path.resolve(process.cwd(), relative_path)

function main() {
  // 1. 创建 dist 文件夹
  try {
    FS.mkdirSync('dist')
  } catch(err) {
    console.debug('info: 文件夹 dist 未创建') // 有可能是创建好了，所以失败也没事
    // console.error(err)
  }
  
  // 2. package.json
  package_json()

  // 3. core
  build(core())
}
main()
