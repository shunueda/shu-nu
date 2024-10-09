import { readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const artifactPath = 'entry-archive.json'

const path = join(process.cwd(), 'src', 'blog')

const files = (await readdir(path, { recursive: true }))
  .filter(it => it.endsWith('.md'))
  .map(it => it.replace('.md', ''))
  .sort()

await writeFile(artifactPath, JSON.stringify(files))
