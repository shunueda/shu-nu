import { execSync } from 'node:child_process'
import { readFile, rename, writeFile } from 'node:fs/promises'
import { format, join } from 'node:path'
import resume from '#assets/resume.json'
import { generate } from './generate'

try {
  const outfile = 'Shun_Ueda_Resume'
  const outdir = 'public'

  const templateFile = format({
    dir: 'src/assets',
    name: 'template.tex'
  })
  const template = await readFile(templateFile, 'utf-8')

  const texfile = format({
    dir: outdir,
    name: outfile,
    ext: 'tex'
  })

  await writeFile(texfile, await generate(resume, template))

  execSync(`pdflatex ${texfile}`)

  const pdffile = format({
    name: outfile,
    ext: 'pdf'
  })

  await rename(pdffile, join(outdir, pdffile))

  execSync(`latexmk -c -f ${texfile}`)
} catch (_: unknown) {
  console.log('Failed to generate resume - you must be Vercel.')
}
