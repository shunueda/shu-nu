export interface Credential {
  authorization: string
  csrf: string
}

export interface CookieRow {
  name: string
  encrypted_value: string
}
