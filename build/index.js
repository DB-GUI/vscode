import * as FS from 'fs'
import { build } from 'esbuild'

import meta from './meta'
import core from './core'

// 开发模式
const is_dev = true

async function main() {
  // 1. 创建 dist 文件夹
  try {
    FS.mkdirSync('dist')
  } catch(err) {
    console.debug('info: 文件夹 dist 未创建') // 有可能是创建好了，所以失败也没事
  }
  // 2. meta
  await meta()
  // 3. core
  build(core(is_dev))
}
main()
