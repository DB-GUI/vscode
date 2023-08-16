const { context } = require('esbuild')

module.exports = is_dev => ({
  entryPoints: 'src/core/main.js',
  bundle: true,
  sourcemap: true,
  treeShaking: !is_dev,
  minify: !is_dev,
  outdir: 'dist',
  logLevel: 'info',
  loader: {
    '.woff2': 'file' // iconfont
  },

})
