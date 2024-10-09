import { readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Octokit } from '@octokit/rest'
import jszip from 'jszip'

const artifact = 'blog-entries.json'

const path = join(process.cwd(), 'src', 'blog')

const files = (await readdir(path, { recursive: true }))
  .filter(it => it.endsWith('.md'))
  .map(it => it.replace('.md', ''))

await writeFile(artifact, JSON.stringify(files, null, 2))

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

const info = {
  owner: 'shunueda',
  repo: 'shu-nu'
}

const runs = await octokit.actions.listWorkflowRunsForRepo({
  ...info,
  per_page: 1,
  branch: process.env.REF
})

const artifacts = await octokit.actions.listWorkflowRunArtifacts({
  ...info,
  run_id: runs.data.workflow_runs[0].id
})

const previous = artifacts.data.artifacts.find(it => it.name === artifact)

const download = await octokit.actions.downloadArtifact({
  ...info,
  artifact_id: previous?.id || 0,
  archive_format: 'zip'
})

const zip = await jszip.loadAsync(download.data as Buffer)
const jsonFile = zip.file(artifact)

const jsonContent = (await jsonFile?.async('string')) || ''

const jsonData = JSON.parse(jsonContent)

console.log('blog-entries.json content:', jsonData)
