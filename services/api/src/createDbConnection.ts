import { ConnectionOptions, createConnection } from 'typeorm'

import { config, isTestMode } from './config'

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  url: config.databaseUrl,
  synchronize: isTestMode,
  logging: false,
  entities: config.dbEntitiesPath,
  ssl: config.dbsslconn, // if not development, will use SSL
  extra: {},
  name: 'default',
  dropSchema: isTestMode,
}
if (connectionOptions.ssl) {
  connectionOptions.extra.ssl = {
    rejectUnauthorized: false, // Heroku uses self signed certificates
  }
}

export default (overrideOptions: any = {}) => {
  return createConnection({
    ...connectionOptions,
    ...overrideOptions
  });
}
