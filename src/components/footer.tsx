import pkg from '~/package.json'

export function Footer() {
  return (
    <footer className='my-12 text-xs text-gray-500'>
      © {new Date().getUTCFullYear()} {pkg.author.name}.
    </footer>
  )
}
