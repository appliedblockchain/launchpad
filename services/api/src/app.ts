import 'reflect-metadata'

import cors from '@koa/cors'
import { Server } from 'http'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import jwt from 'koa-jwt'
import winston from 'winston'

import { config } from './config'
import { errorHandler, logger, tracingHandler } from './middleware'
import { protectedRouter } from './protectedRoutes'
import { unprotectedRouter } from './unprotectedRoutes'

let server: Server;
export default () : Server  => {
  if (server) {
    return server;
  }
  const app = new Koa()

  app
    .use(tracingHandler)
    .use(errorHandler)
    .use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            'cdnjs.cloudflare.com',
            'fonts.googleapis.com',
          ],
          fontSrc: ["'self'", 'fonts.gstatic.com'],
          imgSrc: [
            "'self'",
            'data:',
            'online.swagger.io',
            'validator.swagger.io',
          ],
        },
      })
    )
    .use(cors())
    .use(logger(winston))
    .use(bodyParser())
    // .use(unprotectedRouter.middleware())
    .use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] }))
    .use(protectedRouter.middleware())

  server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
  return server;
}
