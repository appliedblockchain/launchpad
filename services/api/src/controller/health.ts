import { BaseContext } from 'koa'
import { description, request, summary, tagsAll } from 'koa-swagger-decorator'

import { config } from '../config'
import { DataSourceInstance } from '../db/data-source'

enum ServiceStatus {
  UP = 'UP',
  DOWN = 'DOWN',
}

@tagsAll(['Health'])
export default class HealthController {
  @request('get', '/health')
  @summary('Health Status')
  @description('Show status of API and all dependent services')
  public static async status(ctx: BaseContext): Promise<void> {
    let dbStatus
    const dataSource = DataSourceInstance

    try {
      await dataSource.query('Select 1;')
      dbStatus = ServiceStatus.UP
    } catch (_) {
      dbStatus = ServiceStatus.DOWN
    }

    const gitCommitHash = config.gitHashVersion

    const responseStatus = [dbStatus].some((x) => x === ServiceStatus.DOWN)
      ? 500
      : 200

    const status = {
      services: {
        postgres: dbStatus,
      },
      gitCommitHash,
    }

    ctx.status = responseStatus
    ctx.body = status
  }
}
