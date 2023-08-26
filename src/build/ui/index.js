import { join } from 'path'
import { readdirSync } from 'fs'
import { stylusLoader } from 'esbuild-stylus-loader'

export default
is_dev => {
  const root = join(process.cwd(), 'src/main/webview/all')
  const list = readdirSync(root)
  const entryPoints = list.map(entry => join(root, entry, 'entry.tsx'))
  return {
    entryPoints: entryPoints,
    entryNames: '[dir]/index', // https://esbuild.github.io/api/#entry-names
    outdir: 'dist/webview',
    bundle: true, // https://esbuild.github.io/api/#bundle
    splitting: true,
    format: 'esm',
    treeShaking: true,
    // sourcemap: is_dev,
    minify: !is_dev,
    logLevel: 'info',
    loader: {
      // '.woff2': 'file' // 静态资源
    },
    plugins: [
      stylusLoader(),
    ],
  }
}
