const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const routes = require('next-routes')()
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handler = routes.getRequestHandler(app)

routes.add('/essays/:id', '/essays/detail')

app.prepare()
.then(() => {
  createServer(handler)
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
