import { Octokit } from '@octokit/rest'

const octokit = new Octokit()

octokit.actions.createOrUpdateEnvironmentSecret
