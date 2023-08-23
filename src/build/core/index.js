export default is_dev => ({
  entryPoints: ['@/main/index'],
  outfile: 'dist/main.js',
  bundle: true,
  sourcemap: is_dev,
  treeShaking: true,
  minify: !is_dev,
  logLevel: 'info',
  platform: 'node',
  target: ['node14.0'],
  external: [
    'vscode',
  ],
})
