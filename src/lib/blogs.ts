import { existsSync, readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import matter from 'gray-matter'
import { i18n } from '#i18n'
import { type BlogPost, frontMatter } from '#types/blog-post'
import { type I18nElement, type Lang, langs, useI18n } from './i18n'

const blogPath = join(process.cwd(), 'src', 'blog')

const files = [
  ...new Set(
    (
      await readdir(blogPath, {
        recursive: true
      })
    )
      .filter(it => it.endsWith('.md'))
      .map(it => basename(it))
  )
]

export const slugs = files.map(it => basename(it))

export const allBlogs: I18nElement<BlogPost>[] = await Promise.all(
  files.map(async file => {
    return Object.fromEntries(
      langs.map(lang => [lang, readBlogPost(file, lang)])
    ) as I18nElement<BlogPost>
  })
)

export function getBlogFromSlug(targetSlug: string, lang: Lang) {
  const blogPost = allBlogs.find(it => it[lang].slug === targetSlug)
  if (!blogPost) {
    return
  }
  const { slug, frontMatter, source } = blogPost[lang]
  return {
    slug,
    frontMatter,
    source
  } satisfies BlogPost
}

function readBlogPost(file: string, lang: Lang) {
  const path = join(blogPath, lang, file)
  const slug = basename(file)
  if (!existsSync(path)) {
    return createLangNotAvailableBlogPost(slug, lang)
  }
  const { content, data } = matter(readFileSync(path).toString())
  return {
    slug,
    source: content,
    frontMatter: frontMatter.create(data)
  } satisfies BlogPost
}

function createLangNotAvailableBlogPost(slug: string, lang: Lang) {
  return useI18n(
    Object.fromEntries(
      langs.map(lang => [
        lang,
        {
          slug,
          source: useI18n(i18n.blog.langNotAvailable.source, lang),
          frontMatter: {
            title: useI18n(i18n.blog.langNotAvailable.title, lang),
            date: new Date(),
            draft: true
          }
        }
      ])
    ) as I18nElement<BlogPost>,
    lang
  )
}
