const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathToRegexp = require('path-to-regexp')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const mobxReact = require('mobx-react')

const handle = app.getRequestHandler()
mobxReact.useStaticRendering(true)

const regex = pathToRegexp('/essays/:id', [])

app.prepare()
.then(() => {
  createServer((req, res) => {
    const { pathname } = parse(req.url, true)

    var values = regex.exec(pathname)
    if (values) {
      const query = { id: values[1] }
      app.render(req, res, '/essays/detail', query)
    } else {
      handle(req, res)
    }
  })
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
