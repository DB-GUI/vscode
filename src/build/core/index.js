export default is_dev => ({
  entryPoints: ['@/main/index'],
  outfile: 'dist/main.js',
  bundle: true,
  treeShaking: true,
  // sourcemap: is_dev,
  minify: !is_dev,
  logLevel: 'info',
  platform: 'node',
  target: ['node14.0'],
  loader: {
    '.svg': 'file' // 静态资源
  },
  external: [
    'vscode',
  ],
})
