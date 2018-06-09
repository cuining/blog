const { createServer } = require('http')
const { parse } = require('url')
const { join } = require('path')
const next = require('next')
const routes = require('next-routes')()
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = routes.getRequestHandler(app)

routes.add('/essays/:id', '/essays/detail')

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname)
      app.serveStatic(req, res, filePath)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(8080, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:8080')
  })
})
