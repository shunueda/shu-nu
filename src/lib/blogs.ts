import { readFile, readdir } from 'node:fs/promises'
import { join, parse, sep } from 'node:path'
import matter from 'gray-matter'
import { i18n } from '#i18n'
import { type I18nElement, type Lang, langs, useI18n } from '#lib/i18n'
import { type Blog, frontmatterStruct } from '#types/blog'

const BLOG_PATH = join(process.cwd(), 'src', 'blog')
const mdext = '.md'

export const blogFiles: readonly string[] = (
  await readdir(BLOG_PATH, { recursive: true })
)
  .filter(file => file.endsWith(mdext))
  .map(file => join(BLOG_PATH, file))

export const slugs: ReadonlySet<string> = new Set(
  blogFiles.map(file => parse(file).name)
)

export const i18nBlogs = Object.fromEntries(
  await Promise.all(
    Object.entries(
      Object.groupBy(
        blogFiles,
        file => parse(file).dir.split(sep).at(-1) as Lang
      )
    ).map(async ([lang, langFiles]) => {
      return [
        lang,
        new Map(await Promise.all(langFiles.map(parseBlogFile)))
      ] as const
    })
  )
) as I18nElement<Map<string, Blog>>

export const notAvailableBlogs = Object.fromEntries(
  langs.map(lang => {
    return [lang, createLangNotAvailableBlog(lang)]
  })
) as I18nElement<Blog>

async function parseBlogFile(file: string) {
  const { name } = parse(file)
  const source = await readFile(file, 'utf-8')
  const { content, data } = matter(source)
  return [
    name,
    {
      frontmatter: frontmatterStruct.create(data),
      content
    } as Blog
  ] as const
}

export function createLangNotAvailableBlog(lang: Lang) {
  const { title, content } = i18n.blog.langNotAvailable
  return useI18n(
    Object.fromEntries(
      langs.map(lang => [
        lang,
        {
          frontmatter: {
            title: useI18n(title, lang),
            date: new Date(),
            draft: true
          },
          content: useI18n(content, lang)
        }
      ])
    ) as I18nElement<Blog>,
    lang
  )
}
