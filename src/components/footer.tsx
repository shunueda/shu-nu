import { config } from '#config'

export async function Footer() {
  return (
    <footer className='my-12 text-xs text-gray-500'>
      © {new Date().getUTCFullYear()} {config.name}.
    </footer>
  )
}
