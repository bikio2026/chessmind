import { copyFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const src = resolve(root, 'node_modules/stockfish/bin')
const dst = resolve(root, 'public')

const files = ['stockfish-18-lite-single.js', 'stockfish-18-lite-single.wasm']
for (const f of files) {
  copyFileSync(resolve(src, f), resolve(dst, f))
  console.log(`✓ Copied ${f} to public/`)
}
