import { existsSync, readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { createElement } from 'react'
import {
  type BlogPost,
  type RenderedBlogPost,
  frontMatter,
} from '#models/BlogPost'
import { Mdx } from '../components/Mdx'
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

export function getRenderedBlogFromSlug(
  lang: Lang,
  targetSlug: string,
): RenderedBlogPost {
  // biome-ignore lint/style/noNonNullAssertion: checked at [readBlogPost]
  const { slug, frontMatter, source } = allBlogs.find(
    it => it[lang].slug === targetSlug,
  )![lang]
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
