const Path = require('path')
const FS = require('node:fs/promises')
const esbuild = require('esbuild')
const packageJson = require('../package.json')

;(async function() {
  const buildType = getBuildType()

  await deleteOldCreateNew()
  await copyStatics()
  await writePackageJSON()
  await esbuildBuild(buildType)
})()

/** 检测 build type */
function getBuildType() {
  const buildType = process.argv[2]
  if(buildType != 'dev' && buildType != 'pro')
    throw Error('error build type: ' + buildType)
  console.log('build type:', buildType)
  return buildType
}

/** 删除旧的 dist，创建新的 dist */
async function deleteOldCreateNew() {
  const dir = p('../dist') // 目标
  try {
    await FS.rm(dir, { // 删除旧的
      recursive: true,
      force: true
    })
    console.log('删除老文件')
  } catch(err) {
    console.log('未检测到老文件或...', err)
  }
  await FS.mkdir(dir) // 创建新的
  console.log('创建目录', dir)
}

/** 把静态文件直接复制过去 */
async function copyStatics() {
  // webview
  await cp('assets')
  // lib
  await cp('lib')
  // doc
  await cp('CHANGELOG.md')
  await cp('LICENSE')
  await cp('README.md')
  console.log('copy assets, changelog, license, readme')
}

/** 处理 package.json */
async function writePackageJSON() {
  delete packageJson.devDependencies // 删除不需要的 dev dependencies 声明
  delete packageJson.dependencies // 删除已打包的 dependencies
  await FS.writeFile(p('../dist/package.json'), JSON.stringify(packageJson))
  console.log('write package.json')
}

/** 使用 esbuild 编译 */
async function esbuildBuild(buildType) {
  await esbuild.build({
    watch: buildType == 'dev',
    minify: buildType == 'pro',
    entryPoints: [p('../app/extension.js')],
    bundle: true,
    sourcemap: buildType == 'dev',
    external: [
      'vscode',
      'sqlite3',
      'oracledb', 'mysql', 'better-sqlite3', 'pg-query-stream',
      'pg-native', 'mock-aws-s3', 'aws-sdk', 'nock'
    ],
    platform: 'node',
    outfile: p('../dist/extension.js'),
  })
  console.log('打包成功，非 app 目录的文件发生改动时，要重启此命令！！！')
}

// --------------------------------
// 下面是一些工具
function p(target) { // 获取绝对路径
  return Path.join(__dirname, target)
}
async function cp(from) { // 复制到 dist 文件夹
  const to = '../dist/' + from
  from = '../' + from
  await FS.cp(p(from), p(to), {
    recursive: true
  })
}