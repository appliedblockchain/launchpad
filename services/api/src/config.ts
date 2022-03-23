import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

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
  port: +(process.env.PORT || 4000),
  debugLogging: isDevMode,
  dbsslconn: !isDevMode && !isTestMode,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
  gitHashVersion:
    process.env.GIT_HASH_VERSION || 'No commit was passed into this build',
  databaseUrl:
    isTestMode ? process.env.TEST_DATABASE_URL :
      process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb',
  dbEntitiesPath: getEntitiesFolder(),
  sentryDsn: process.env.SENTRY_DSN,
  passwordSaltRounds: +process.env.PASSWORD_SALT_ROUNDS || 10,
  migrationsPath: [
    "src/migrations/**/*.ts",
  ]
}

export { config }
