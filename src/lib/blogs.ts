import { readdirSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import { type BlogPost, frontMatter } from '#models/BlogPost'
import type { Lang } from './i18n'
import { stripExtension } from './utils'

export async function getAllBlogs(lang: Lang): Promise<BlogPost[]> {
  const path = join(process.cwd(), 'src', 'assets', 'blog', 'posts', lang)
  const files = readdirSync(path)
  return await Promise.all(
    files.map(async file => {
      const { data, content } = matter(
        (await readFile(join(path, file))).toString().trim(),
      )
      return {
        slug: stripExtension(file),
        content,
        frontMatter: frontMatter.create(data),
      } satisfies BlogPost
    }),
  )
}

export async function getBlog(slug: string, lang: Lang): Promise<BlogPost> {
  const path = join(
    process.cwd(),
    'src',
    'assets',
    'blog',
    'posts',
    lang,
    `${slug}.md`,
  )
  const { data, content } = matter((await readFile(path)).toString().trim())
  return {
    slug,
    content,
    frontMatter: frontMatter.create(data),
  } satisfies BlogPost
}
