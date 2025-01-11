export interface Credential {
  authorization: string
  csrf: string
}

export interface Row {
  name: string
  encrypted_value: string
}
