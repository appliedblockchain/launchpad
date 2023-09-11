import dotenv from 'dotenv'
import { existsSync } from 'fs'

if (existsSync('../../.env')) {
  dotenv.config({ path: '../../.env' })
} else if (existsSync(`../../.env.${process.env.NODE_ENV}`)) {
  dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` })
} else {
  console.error('ERROR: no env file found - exiting...')
  process.exit(1)
}

import path from 'path';

export interface Config {
  port: number
  debugLogging: boolean
  dbsslconn: boolean
  jwtSecret: string
  gitHashVersion: string
  databaseUrl: string
  dbEntitiesPath: string[]
  sentryDsn: string
  passwordSaltRounds: number
  migrationsPath: string[]
}

const isDevMode = process.env.NODE_ENV == 'development'
export const isTestMode = process.env.NODE_ENV == 'test'

const getEntitiesFolder = () => {
  if (isDevMode) {
    return ['src/entity/**/*.ts'];
  }
  if (isTestMode) {
    return [path.join(__dirname, '/entity/**/*.ts')]
  }
  // production
  return ['build/entity/**/*.js']
}

const config: Config = {
  port: isTestMode ? +(process.env.TEST_APP_PORT || 4002) : +(process.env.PORT || 4000),
  debugLogging: isDevMode,
  dbsslconn: !isDevMode && !isTestMode,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
  gitHashVersion:
    process.env.GIT_HASH_VERSION || 'No commit was passed into this build',
  databaseUrl:
    isTestMode ? process.env.TEST_DATABASE_URL :
      process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/launchpad_dev',
  dbEntitiesPath: getEntitiesFolder(),
  sentryDsn: process.env.SENTRY_DSN,
  passwordSaltRounds: +process.env.PASSWORD_SALT_ROUNDS || 13,
  migrationsPath: [
    "src/migrations/**/*.ts",
  ]
}

export { config }
