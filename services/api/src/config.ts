import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

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

const config: Config = {
  port: +(process.env.PORT || 4000),
  debugLogging: isDevMode,
  dbsslconn: !isDevMode,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
  gitHashVersion:
    process.env.GIT_HASH_VERSION || 'No commit was passed into this build',
  databaseUrl:
    process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb',
  dbEntitiesPath: [
    ...(isDevMode ? ['src/entity/**/*.ts'] : ['build/entity/**/*.js']),
  ],
  sentryDsn: process.env.SENTRY_DSN,
  passwordSaltRounds: +process.env.PASSWORD_SALT_ROUNDS || 10,
  migrationsPath: [
    "src/migrations/**/*.ts",
  ]
}

export { config }
