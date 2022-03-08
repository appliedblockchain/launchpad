import { ConnectionOptions, createConnection } from 'typeorm'

import { config } from './config'

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  url: config.databaseUrl,
  synchronize: true,
  logging: false,
  entities: config.dbEntitiesPath,
  ssl: config.dbsslconn, // if not development, will use SSL
  extra: {},
}
if (connectionOptions.ssl) {
  connectionOptions.extra.ssl = {
    rejectUnauthorized: false, // Heroku uses self signed certificates
  }
}

export default () => {
  return createConnection(connectionOptions)
}
