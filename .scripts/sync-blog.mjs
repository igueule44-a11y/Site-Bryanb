#!/usr/bin/env node
// USAGE: node .scripts/sync-blog.mjs
//
// Copies blog files from /Users/brabra/omnyx-studio (source) to this repo.
// The generated HTML already uses correct relative paths from /blog/ to root
// (../index.html, ../assets/...), so we copy as-is. No path rewriting.
//
// Keep blog-articles.json in omnyx-studio as the single source of truth.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(__dirname, '..')
const SRC = resolve(REPO, '../omnyx-studio/src/pages')
const DST = REPO

const items = [
  { src: 'blog-index.html', dst: 'blog.html' },
]

const blogDir = resolve(SRC, 'blog')
if (existsSync(blogDir)) {
  mkdirSync(resolve(DST, 'blog'), { recursive: true })
  for (const f of readdirSync(blogDir)) {
    if (f.endsWith('.html')) {
      items.push({ src: `blog/${f}`, dst: `blog/${f}` })
    }
  }
}

for (const { src, dst } of items) {
  const content = readFileSync(resolve(SRC, src), 'utf-8')
  writeFileSync(resolve(DST, dst), content)
  console.log(`✓ ${dst}`)
}

console.log(`\nTotal: ${items.length} files copied.`)
