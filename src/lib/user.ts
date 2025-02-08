import { Octokit } from '@octokit/rest'
import resume from '~/assets/resume.json' with { type: 'json' }

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

const basic = await octokit.users.getAuthenticated()

const socials = await octokit.users.listSocialAccountsForAuthenticatedUser()

export const user = {
  ...basic.data,
  socials: socials.data,
  resume
}
