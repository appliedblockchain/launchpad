import { SwaggerRouter } from 'koa-swagger-decorator'

import { auth, health } from './controller'

const unprotectedRouter = new SwaggerRouter()

unprotectedRouter.get('/health', health.status)

unprotectedRouter.post('/login', auth.login)

unprotectedRouter.swagger({
  swaggerHtmlEndpoint: '/docs',
  title: 'launchpad-ts',
  description:
    'API REST using NodeJS and KOA framework, typescript. TypeORM for SQL with class-validators. Middlewares JWT, CORS, Winston Logger.',
  version: '1.8.0',
})

// mapDir will scan the input dir, and automatically call router.map to all Router Class
unprotectedRouter.mapDir(__dirname)

export { unprotectedRouter }
