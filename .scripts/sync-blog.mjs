#!/usr/bin/env node
// USAGE: node .scripts/sync-blog.mjs
//
// Copies blog files from /Users/brabra/omnyx-studio (source) to this repo.
// The generated HTML already uses correct relative paths from /blog/ to root
// (../index.html, ../assets/...), so we copy as-is. No path rewriting.
//
// Also regenerates sitemap.xml from the actual files on disk (so any new
// article in /blog/*.html is added automatically with the right lastmod).
//
// Keep blog-articles.json in omnyx-studio as the single source of truth.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(__dirname, '..')
const SRC = resolve(REPO, '../omnyx-studio/src/pages')
const DST = REPO
const SITE = 'https://omnyx.agency'

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

// Regenerate sitemap.xml from actual files
const dstBlogDir = resolve(DST, 'blog')
if (existsSync(dstBlogDir)) {
  const articleFiles = readdirSync(dstBlogDir).filter(f => f.endsWith('.html'))
  const articleUrls = articleFiles.map(f => {
    // Try to extract date from the article HTML (look for "datePublished" in JSON-LD)
    const content = readFileSync(resolve(dstBlogDir, f), 'utf-8')
    const dateMatch = content.match(/"datePublished":\s*"([0-9-]+)"/)
    const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0]
    return `  <url>
    <loc>${SITE}/blog/${f}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  }).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE}/blog.html</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${articleUrls}
</urlset>
`
  writeFileSync(resolve(DST, 'sitemap.xml'), sitemap)
  console.log(`✓ sitemap.xml (regenerated with ${articleFiles.length} articles)`)
}

console.log(`\nTotal: ${items.length} files copied + sitemap regenerated.`)
