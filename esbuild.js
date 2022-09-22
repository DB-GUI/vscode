const options = {
  entryPoints: ['app/extension.js'],
  bundle: true,
  sourcemap: true,
  external: [
    'vscode',
    'sqlite3',
    'oracledb', 'mysql', 'better-sqlite3', 'pg-query-stream',
    'pg-native', 'mock-aws-s3', 'aws-sdk', 'nock'
  ],
  platform: 'node',
  outfile: 'extension.js',
}

const buildType = process.argv[2]
switch(buildType) {
  case 'dev':
    options.watch = true
    console.log('开发……')
    break
  case 'pro':
    console.log('发布……')
    break
  default:
    throw Error('buildType error')
}

require('esbuild').build(options).catch(err => {
  process.exit(1)
})