import { config } from '@/package.json'
import getNotionResumeAsMd from '@/utils/getNotionResumeAsMd'
import { execSync } from 'node:child_process'
import { readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import generateLatexResume from './generateLatexResume'

const resume = await getNotionResumeAsMd()
const template = readFileSync('assets/template.tex').toString()

const latex = await generateLatexResume(resume, template)

const FILENAME = join(process.cwd(), `${config.pdf.filename}.tex`)

writeFileSync(FILENAME, latex)

execSync(`pdflatex ${FILENAME}`)

readdirSync(process.cwd())
  .filter(it => it.startsWith(config.pdf.filename) && !it.endsWith('.pdf'))
  .forEach(unlinkSync)
