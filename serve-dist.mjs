import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'dist')
const port = Number(process.env.PORT ?? 5173)

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp'
}

createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`)
  const requestedPath = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '')
  const filePath = join(root, requestedPath === '/' ? 'index.html' : requestedPath)

  try {
    const body = await readFile(filePath)
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath)] ?? 'application/octet-stream'
    })
    response.end(body)
  } catch {
    const fallback = await readFile(join(root, 'index.html'))
    response.writeHead(200, { 'Content-Type': contentTypes['.html'] })
    response.end(fallback)
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`France history site running at http://127.0.0.1:${port}`)
})
