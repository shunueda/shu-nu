/**
 * Compiles a LaTeX document to a PDF using TeXLive.net server.
 *
 * {@link https://davidcarlisle.github.io/latexcgi/}
 */
import { Endpoint } from '#lib/endpoint'

const body = new FormData()
body.append('filename[]', 'document.tex') // The server expects this exact name
body.append('return', 'pdf')

export async function compile(content: string): Promise<Buffer<ArrayBuffer>> {
  body.append('filecontents[]', content)
  return fetch(Endpoint.TEXLIVE, {
    method: 'POST',
    body
  })
    .then(it => it.arrayBuffer())
    .then(Buffer.from)
}
