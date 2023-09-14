import 'reflect-metadata'

import * as Sentry from '@sentry/node'

import app from './app'
import { config } from './config'
import {  DataSourceInstance } from './db/data-source'

const launch = async () => {
  if (config.sentryDsn) {
    Sentry.init({
      dsn: config.sentryDsn,
      environment: process.env.NODE_ENV,
      tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
    })
  }

  if (!DataSourceInstance.isInitialized) {
    await DataSourceInstance.initialize()
  }

  app()
}

launch()
