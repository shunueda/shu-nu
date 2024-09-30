import { existsSync, readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import matter from 'gray-matter'
import { createElement } from 'react'
import { Mdx } from '#components/mdx'
import {
  type BlogPost,
  type RenderedBlogPost,
  frontMatter,
} from '#models/BlogPost'
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

export function getRenderedBlogFromSlug(lang: Lang, targetSlug: string) {
  const blogPost = allBlogs.find(it => it[lang].slug === targetSlug)
  if (!blogPost) {
    return
  }
  const { slug, frontMatter, source } = blogPost[lang]
  return {
    slug,
    frontMatter,
    rendered: createElement(Mdx, { source }),
  } satisfies RenderedBlogPost
}

function readBlogPost(lang: Lang, file: string) {
  const path = join(postPath, lang, file)
  const slug = stripExtension(file)
  if (!existsSync(path)) {
    return {
      slug,
      source: 'Nothing ... yet.',
      frontMatter: frontMatter.create({
        title: 'Not Found',
        date: new Date(),
      }),
    } satisfies BlogPost
  }
  const { content, data } = matter(readFileSync(path).toString())
  return {
    slug,
    source: content,
    frontMatter: frontMatter.create(data),
  } satisfies BlogPost
}
