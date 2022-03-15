import 'reflect-metadata'

import * as Sentry from '@sentry/node'

import app from './app'
import { config } from './config'
import createDbConnection from './createDbConnection'

const launch = async () => {
  if (config.sentryDsn) {
    Sentry.init({
      dsn: config.sentryDsn,
      environment: process.env.NODE_ENV,
      tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
    })
  }

  await createDbConnection()

    .catch((error: string) => {
      const errorMessage = `TypeORM connection error: ${error}`
      console.log(errorMessage)
      Sentry.captureException(errorMessage)
    })

  app()
}

launch()
