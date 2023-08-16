module.exports = is_dev => ({
  entryPoints: ['src/main.js'],
  bundle: true,
  sourcemap: true,
  treeShaking: !is_dev,
  minify: !is_dev,
  outdir: 'dist',
  logLevel: 'info',
  platform: 'node',
  target: ['node14.0'],
  external: [
    'vscode',
    'better-sqlite3',
    'oracledb',
  ],
})
