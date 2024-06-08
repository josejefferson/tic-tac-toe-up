import * as express from 'express'
import { Server } from 'http'
import { renderPage } from 'vike/server'

export async function webMiddleware(server: Server) {
  const isProduction = process.env.NODE_ENV === 'production'
  const middlewares: express.Handler[] = []

  if (isProduction) {
    middlewares.push(express.static('build/client'))
  } else {
    const vite = await import('vite')
    const viteDev = await vite.createServer({
      server: { middlewareMode: true, hmr: { server } }
    })
    middlewares.push(viteDev.middlewares)
  }

  middlewares.push(async (req, res, next) => {
    if (req.url.startsWith('/api')) return next()

    const { httpResponse } = await renderPage({
      urlOriginal: req.originalUrl,
      headersOriginal: req.headers,
      cookies: req.cookies,
      host: req.headers.host
    })

    if (!httpResponse) {
      return next()
    } else {
      const { statusCode, headers } = httpResponse
      headers.forEach(([name, value]) => res.setHeader(name, value))
      res.status(statusCode)
      httpResponse.pipe(res)
    }
  })

  return middlewares
}
