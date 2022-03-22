const path = require('path');

module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: true,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
    },
  },
  {
    name: 'test',
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.TEST_DATABASE_NAME,
    synchronize: true,
    logging: true,
    dropSchema: true,
    // migrationsRun: true,
    entities: [path.join(__dirname, '/../**/**.entity{.ts,.js}')],
    migrations: ['./src/migration/**/*.ts'],
    cli: {
      entitiesDir: '../src/entity',
      migrationsDir: '../src/migration',
    },
  },
]
