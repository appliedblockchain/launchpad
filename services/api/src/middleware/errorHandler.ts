import Sentry from '@sentry/node'
import { Context } from 'koa'

const sentryErrorHandler = (err: Error, ctx: Context) => {
  Sentry.withScope(function (scope) {
    scope.addEventProcessor(function (event) {
      return Sentry.Handlers.parseRequest(event, ctx.request)
    })
    Sentry.captureException(err)
  })
}

export default async (
  context: Context,
  next: () => Promise<any>
): Promise<void> => {
  const ctx = context

  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      status: ctx.status,
      name: err.name,
      message: err.message,
      requestId:
        process.env.NODE_ENV === 'test' ? '' : ctx.logger?.defaultMeta.requestId,
    }

    ctx.logger?.error(err.stack)
    sentryErrorHandler(err, context)
  }
}
