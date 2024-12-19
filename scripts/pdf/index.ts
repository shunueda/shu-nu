import { execSync } from 'node:child_process'
import { readFile, rename, writeFile } from 'node:fs/promises'
import { format, join } from 'node:path'
import resume from '#assets/resume.json'
import { generate } from './generate'

const outfile = 'Shun_Ueda_Resume'
const outdir = 'public'

const template = await readFile(
  format({
    dir: 'src/assets',
    name: 'template.tex'
  }),
  'utf-8'
)

const latex = await generate(resume, template)

const texfile = format({
  dir: outdir,
  name: outfile,
  ext: 'tex'
})

await writeFile(texfile, latex)

execSync(`pdflatex ${texfile}`)

const pdffile = format({
  name: outfile,
  ext: 'pdf'
})

await rename(pdffile, join(outdir, pdffile))

execSync(`latexmk -c ${texfile}`, {
  stdio: 'ignore'
})
