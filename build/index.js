import * as FS from 'fs'
import { build } from 'esbuild'

import build_meta from './meta'
import get_core_options from './core'
import get_ui_options from './ui'

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
  await build_meta()
  // 3. core
  console.log('\n\nbuilding core...')
  await build(get_core_options(is_dev))
  // 4. ui
  console.log('\n\nbuilding ui...')
  await build(await get_ui_options(is_dev))
}
main()
