import { readFile, readdir } from 'node:fs/promises'
import { format, join } from 'node:path'
import matter from 'gray-matter'
import { i18n } from '#i18n'
import {
  type I18nElement,
  type Lang,
  generateI18nElement,
  useI18n
} from '#lib/i18n'
import { type BlogPost, frontmatter } from '#types/blog-post'

const path = join(process.cwd(), 'src', 'blog')

export const slugs: readonly string[] = await readdir(path)

export const blog: ReadonlyMap<
  string,
  I18nElement<BlogPost | undefined>
> = new Map(
  await Promise.all(
    slugs.map(async slug => {
      return [
        slug,
        await generateI18nElement(lang => readBlogPost(slug, lang))
      ] as const
    })
  )
)

async function readBlogPost(slug: string, lang: Lang) {
  const filepath = format({
    dir: join(path, slug),
    name: lang,
    ext: '.md'
  })
  try {
    const buffer = await readFile(filepath)
    const { content, data } = matter(buffer.toString())
    return {
      slug,
      content: content.replaceAll('「', ' 「').replaceAll('」', '」 '),
      frontmatter: frontmatter.create(data)
    } satisfies BlogPost
  } catch (_) {
    return
  }
}

export function getBlogPostOrNotFound(slug: string, lang: Lang): BlogPost {
  const { title, content } = i18n.blog.notFound
  return (
    blog.get(slug)?.[lang] || {
      slug,
      content: useI18n(content, lang),
      frontmatter: frontmatter.create({
        title: useI18n(title, lang),
        date: new Date()
      })
    }
  )
}
