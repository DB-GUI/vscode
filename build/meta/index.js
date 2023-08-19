import { writeFileSync, cpSync, copyFileSync } from 'fs'
import package_json from './package.json.js'
import l10n from './l10n'

export default async function() {
  writeFileSync('dist/package.json', JSON.stringify(package_json, null, 2))
  await l10n()
  cpSync('asset/public', 'dist/public', {
    recursive: true
  })
  copyFileSync('doc/CHANGELOG.md', 'dist/CHANGELOG.md')
  copyFileSync('README.md', 'dist/README.md')
  copyFileSync('LICENSE', 'dist/LICENSE')
}
