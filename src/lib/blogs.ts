import { existsSync, readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import matter from 'gray-matter'
import { createElement } from 'react'
import { Mdx } from '#components/mdx'
import {
  type BlogPost,
  type RenderedBlogPost,
  frontMatter
} from '#types/blog-post'
import { type I18nElement, Lang, useI18nElement } from './i18n'
import { stripExtension } from './utils'

const postPath = join(process.cwd(), 'src', 'blog')

const files = [
  ...new Set(
    (
      await readdir(postPath, {
        recursive: true
      })
    )
      .filter(it => it.endsWith('.md'))
      .map(it => basename(it))
  )
]

export const slugs = files.map(stripExtension)

export const allBlogs: I18nElement<BlogPost>[] = await Promise.all(
  files.map(async file => {
    return {
      [Lang.EN]: readBlogPost(Lang.EN, file),
      [Lang.JA]: readBlogPost(Lang.JA, file)
    } satisfies I18nElement<BlogPost>
  })
)

export function getRenderedBlogFromSlug(targetSlug: string, lang: Lang) {
  const blogPost = getBlogFromSlug(targetSlug, lang)
  if (!blogPost) {
    return
  }
  const { slug, frontMatter, source } = blogPost
  return {
    slug,
    frontMatter,
    rendered: createElement(Mdx, { source, lang })
  } satisfies RenderedBlogPost
}

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

function readBlogPost(lang: Lang, file: string) {
  const path = join(postPath, lang, file)
  const slug = stripExtension(file)
  if (!existsSync(path)) {
    return useI18nElement(
      {
        en: {
          slug,
          source:
            'Please select another language from the switch on the top right',
          frontMatter: {
            title: 'Not available in this language',
            date: new Date(),
            draft: true
          }
        },
        ja: {
          slug,
          source: '右上のスイッチから他の言語を選択してください',
          frontMatter: frontMatter.create({
            title: 'この言語では利用できません',
            date: new Date(),
            draft: true
          })
        }
      } satisfies I18nElement<BlogPost>,
      lang
    )
  }
  const { content, data } = matter(readFileSync(path).toString())
  return {
    slug,
    source: content,
    frontMatter: frontMatter.create(data)
  } satisfies BlogPost
}
