import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import pkg from '../package.json'

const notionToMarkdown = new NotionToMarkdown({
  notionClient: new Client({
    auth: process.env.NOTION_API_KEY
  })
})

export default async function getNotionResumeAsMd() {
  const mdBlocks = await notionToMarkdown.pageToMarkdown(
    pkg.config.notion_page_id
  )
  return notionToMarkdown.toMarkdownString(mdBlocks).parent
}
