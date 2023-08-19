export default is_dev => ({
  entryPoints: ['@/main'],
  bundle: true,
  sourcemap: true,
  treeShaking: true,
  minify: !is_dev,
  outdir: 'dist',
  logLevel: 'info',
  platform: 'node',
  target: ['node14.0'],
  external: [
    'vscode',
  ],
})
