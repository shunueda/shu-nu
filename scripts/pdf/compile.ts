/**
 * Compiles a LaTeX document to a PDF using TeXLive.net server.
 *
 * {@link https://davidcarlisle.github.io/latexcgi/}
 */
const endpoint = 'https://texlive.net/cgi-bin/latexcgi'

const body = new FormData()
body.append('filename[]', 'document.tex') // The server expects this exact name
body.append('return', 'pdf')

export async function compile(content: string) {
  body.append('filecontents[]', content)
  return fetch(endpoint, {
    method: 'POST',
    body
  })
    .then(it => it.arrayBuffer())
    .then(Buffer.from)
}
