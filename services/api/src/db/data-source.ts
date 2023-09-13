import { DataSource } from 'typeorm'

import { config } from '../config'

export const DataSourceInstance = new DataSource({
    type: 'postgres',
    url: config.databaseUrl,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: process.env.NODE_ENV === 'production',
    synchronize: false,
    logging: false,
    migrations: config.migrationsPath,
    entities: config.dbEntitiesPath,
})

