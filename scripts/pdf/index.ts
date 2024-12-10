import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import resume from '#assets/resume.json'
import { generate } from './generate'

const template = readFileSync('src/assets/template.tex').toString()

const texfile = join(process.cwd(), 'public/resume.tex')

await writeFile(texfile, await generate(resume, template))

execSync(`pdftex ${texfile} -output-directory=public`)
