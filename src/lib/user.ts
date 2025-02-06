import type { Endpoints } from '@octokit/types'
import { Endpoint } from '#lib/endpoint'

type User = Endpoints['GET /users/{username}']['response']['data']

const response = await fetch(Endpoint.GITHUB_USER)
const json = (await response.json()) as User

export const { name, bio, avatar_url } = json
