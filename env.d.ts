declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_API_KEY: string
      NOTION_API_KEY: string
    }
  }
}

export {}
