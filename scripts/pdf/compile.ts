const endpoint = 'https://texlive.net/cgi-bin/latexcgi'

const body = new FormData()
body.append('filename[]', 'document.tex') // The server expects this exact name
body.append('return', 'pdf')

/**
 * Compiles a LaTeX document to a PDF using texlive.net (latexcgi).
 *
 * {@link https://davidcarlisle.github.io/latexcgi/}
 */
export async function compile(content: string) {
  body.append('filecontents[]', content)
  const response = await fetch(endpoint, {
    method: 'POST',
    body
  })
  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}
