#!/usr/bin/env node
// USAGE: node .scripts/sync-blog.mjs
//
// Copies blog files from /Users/brabra/omnyx-studio (source) to this repo,
// adapting paths:
//   /assets/X   -> assets/X   (relative)
//   /blog.css   -> blog.css   (relative)
//   /blog/X.html -> blog/X.html (relative)
//
// Run this AFTER running `node generate-blog.mjs` in omnyx-studio
// (or after manually editing blog-articles.json there) to refresh
// the blog/ directory here before git commit.
//
// Keep blog-articles.json in omnyx-studio as the single source of truth.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(__dirname, '..')
const SRC = resolve(REPO, '../omnyx-studio/src/pages')
const DST = REPO

const SITE = 'https://omnyx.agency'

function adapt(html) {
  return html
    // Keep absolute paths in canonical/meta tags (they must be absolute for SEO)
    // but rewrite asset references inside <body> to relative paths
    .replace(/<link rel="stylesheet" href="\/pages\/blog\.css"/g, '<link rel="stylesheet" href="blog.css"')
    .replace(/(<img[^>]+src=")\/assets\//g, '$1assets/')
    .replace(/(href=")\/assets\//g, '$1assets/')
    // Internal /blog/<slug>.html links -> blog/<slug>.html (relative)
    .replace(/(href=")\/blog\//g, '$1blog/')
    .replace(/(href=")\/blog\.html/g, '$1blog.html')
    // Same for <link rel="canonical"> keep absolute, that's correct for SEO
    // JSON-LD url fields stay absolute (required by Google)
}

const items = [
  { src: 'blog-index.html', dst: 'blog.html' },
]

// Copy individual articles
const blogDir = resolve(SRC, 'blog')
if (existsSync(blogDir)) {
  mkdirSync(resolve(DST, 'blog'), { recursive: true })
  for (const f of readdirSync(blogDir)) {
    if (f.endsWith('.html')) {
      items.push({ src: `blog/${f}`, dst: `blog/${f}` })
    }
  }
}

// Copy CSS
items.push({ src: 'blog.css', dst: 'blog.css' })

for (const { src, dst } of items) {
  const content = readFileSync(resolve(SRC, src), 'utf-8')
  const adapted = adapt(content)
  writeFileSync(resolve(DST, dst), adapted)
  console.log(`✓ ${dst}`)
}

console.log(`\nTotal: ${items.length} files copied.`)
