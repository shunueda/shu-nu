import { readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const artifact = 'blog-entries.json'

const blogPath = join(process.cwd(), 'src', 'blog')

const files = (
  await readdir(blogPath, {
    recursive: true
  })
)
  .filter(it => it.endsWith('.md'))
  .map(it => it.replace('.md', ''))

await writeFile(artifact, JSON.stringify(files, null, 2))
