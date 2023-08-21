import { join } from 'path'
import { readdirSync } from 'fs'

export default
is_dev => {
  const root = join(process.cwd(), 'src/webview/entry')
  const list = readdirSync(root)
  const entryPoints = list.map(entry => join(root, entry))
  return {
    entryPoints: entryPoints,
    bundle: true, // https://esbuild.github.io/api/#bundle
    splitting: true,
    format: 'esm',
    sourcemap: is_dev,
    treeShaking: !is_dev,
    minify: !is_dev,
    outdir: 'dist/webview',
    logLevel: 'info',
    loader: {
      // '.woff2': 'file' // 静态资源
    },
  }
}
