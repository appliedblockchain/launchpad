import { LoginResponse,User } from '@launchpad-ts/shared-types'
import {
  body,
  Context,
  request,
  responsesAll,
  summary,
  swaggerClass,
  swaggerProperty,
  tagsAll,
} from 'koa-swagger-decorator'

import { DataSourceInstance } from '../db/data-source'
import { UserEntity, userSchema } from '../entity/user'
import jwtHelper from '../helper/jwt'
import passwordHelper from '../helper/password'

@swaggerClass()
export class LoginRequest {
  @swaggerProperty({
    type: 'string',
    required: true,
    example: 'avileslopez.javier@gmail.com',
  })
  email= ''
  @swaggerProperty({ type: 'string', required: true, example: 'password123' })
  password = ''
}

const { password, ...schemaWithoutPassword } = userSchema

@responsesAll({
  200: {
    description: 'success',

    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: schemaWithoutPassword,
      },
      accessToken: {
        type: 'string',
        example:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    },
  },
  400: { description: 'bad request' },
  401: { description: 'Invalid email or password' },
})
@tagsAll(['Auth'])
export default class UserController {
  @request('post', '/login')
  @summary('Authenticates user and returns jwt')
  @body((LoginRequest as any).swaggerDocument)
  public static async login(ctx: Context): Promise<void> {
    const userRepository = DataSourceInstance.getRepository(UserEntity)
    const body = ctx.request.body
    const { email, password } = body as { email: string, password: string };

    const [user]: User[] = await userRepository.find({
      where: { email: email },
      select: ['id', 'name', 'email', 'password'],
    })
    const valid =
      user && (await passwordHelper.validatePassword(user, password))
    if (valid) {
      const { password, ...userWithoutPassword } = user
      const accessToken = jwtHelper.getAccessToken(user);
      ctx.status = 200
      ctx.body = <LoginResponse>{
        accessToken,
        user: userWithoutPassword,
      }
    } else {
      ctx.status = 401
      ctx.body = 'Invalid email or password'
    }
  }
}
