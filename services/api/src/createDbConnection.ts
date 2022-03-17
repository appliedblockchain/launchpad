import { ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm'

import { config } from './config'

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  url: config.databaseUrl,
  synchronize: false,
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

export default async () => {
  const co = await getConnectionOptions();
  console.warn({co});
  // todo select test db
  return createConnection(connectionOptions)
}
