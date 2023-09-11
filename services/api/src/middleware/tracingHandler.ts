import * as Sentry from '@sentry/node'
import {
  extractTraceparentData,
  stripUrlQueryAndFragment,
} from '@sentry/utils'
import { Context } from 'koa'

export default async (ctx: Context, next: () => Promise<any>) => {
  const reqMethod = (ctx.method || '').toUpperCase()
  const reqUrl = ctx.url && stripUrlQueryAndFragment(ctx.url)

  let traceparentData
  if (ctx.request.get('sentry-trace')) {
    traceparentData = extractTraceparentData(ctx.request.get('sentry-trace'))
  }

  // const transaction = Sentry.startTransaction({
  //   name: `${reqMethod} ${reqUrl}`,
  //   op: 'http.server',
  //   ...traceparentData,
  // })

  // ctx.__sentry_transaction = transaction

  // Sentry.getCurrentHub().configureScope(async (scope) => {
  //   scope.setSpan(transaction)
  // })

  // ctx.res.on('finish', () => {
  //   setImmediate(() => {
  //     if (ctx._matchedRoute) {
  //       const mountPath = ctx.mountPath || ''
  //       transaction.setName(`${reqMethod} ${mountPath}${ctx._matchedRoute}`)
  //     }
  //     transaction.setHttpStatus(ctx.status)
  //     transaction.finish()
  //   })
  // })

  await next()
}
