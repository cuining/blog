const { createServer } = require('http')
const { parse } = require('url')
const { join } = require('path')
const next = require('next')
const LRUCache = require('lru-cache')

const routes = require('next-routes')()
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  renderAndCache(req, res, route.page, req.params)
})

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 * 72
})

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

function getCacheKey(req) {
  return `${req.url}`
}

async function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}
