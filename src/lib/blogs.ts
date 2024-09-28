import { existsSync, readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import matter from 'gray-matter'
import { type BlogPost, frontMatter } from '#models/BlogPost'
import { type I18nElement, Lang } from './i18n'
import { stripExtension } from './utils'

const postPath = join(process.cwd(), 'src', 'assets', 'blog', 'posts')

const files = [
  ...new Set(
    (
      await readdir(postPath, {
        recursive: true,
      })
    )
      .filter(it => it.endsWith('.md'))
      .map(it => basename(it)),
  ),
]

export const slugs = files.map(stripExtension)

export const allBlogs: I18nElement<BlogPost>[] = await Promise.all(
  files.map(async file => {
    return {
      [Lang.EN]: readBlogPost(Lang.EN, file),
      [Lang.JA]: readBlogPost(Lang.JA, file),
    } satisfies I18nElement<BlogPost>
  }),
)

export function getBlogFromSlug(lang: Lang, slug: string): BlogPost {
  // biome-ignore lint/style/noNonNullAssertion: checked at [readBlogPost]
  return allBlogs.find(it => it[lang].slug === slug)![lang]
}

function readBlogPost(lang: Lang, file: string) {
  const path = join(postPath, lang, file)
  const slug = stripExtension(file)
  if (!existsSync(path)) {
    return {
      slug,
      content: 'Nothing ... yet.',
      frontMatter: frontMatter.create({
        title: 'Not Found',
        date: new Date(),
      }),
    } satisfies BlogPost
  }
  const { content, data } = matter(readFileSync(path).toString())
  return {
    slug,
    content,
    frontMatter: frontMatter.create(data),
  } satisfies BlogPost
}
