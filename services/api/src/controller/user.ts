import { User } from '@launchpad-ts/shared-types'
import { validate, ValidationError } from 'class-validator'
import { Context } from 'koa'
import {
  body,
  path,
  request,
  responses,
  responsesAll,
  summary,
  tagsAll,
} from 'koa-swagger-decorator'
import { Equal, Like, Not, Repository } from 'typeorm'

import { DataSourceInstance } from '../db/data-source'
import { UserEntity, userSchema } from '../entity/user'
import jwtHelper from '../helper/jwt'
import passwordHelper from '../helper/password'

interface GetUserRequest {
  name: string;
}

@tagsAll(['User'])
export default class UserController {
  @request('get', '/users')
  @summary('Find all users')
  @responses({
    200: {
      description: 'success',
      type: 'array',
      items: {
        type: 'object',
        properties: userSchema,
      },
    },
  })
  public static async getUsers(ctx: Context): Promise<void> {
    // get a user repository to perform operations with user
    const userRepository: Repository<User> =
      DataSourceInstance.getRepository(UserEntity)

    // load all users
    const users: User[] = await userRepository.find()

    // return OK status code and loaded users array
    ctx.status = 200
    ctx.body = users
  }

  // @request('get', '/users/{id}')
  // @summary('Find user by id')
  // @path({
  //   id: { type: 'number', required: true, description: 'id of user' },
  // })
  // @responses({
  //   400: {
  //     description:
  //       "The user you are trying to retrieve doesn't exist in the db",
  //   },
  //   200: {
  //     description: 'success',
  //     type: 'object',
  //     properties: userSchema,
  //   },
  // })
  // public static async getUser(ctx: Context): Promise<void> {
  //   // get a user repository to perform operations with user
  //   const userRepository: Repository<User> =
  //     DataSourceInstance.getRepository(UserEntity)

  //   // load user by id
  //   const user: User | undefined = await userRepository.findOne(
  //     +ctx.params.id || 0
  //   )

  //   if (user) {
  //     // return OK status code and loaded user object
  //     ctx.status = 200
  //     ctx.body = user
  //   } else {
  //     // return a BAD REQUEST status code and error message
  //     ctx.status = 400
  //     ctx.body = "The user you are trying to retrieve doesn't exist in the db"
  //   }
  // }

  // @request('post', '/users')
  // @summary('Create a user')
  // @body(userSchema)
  // @responses({
  //   400: {
  //     description: 'validation error / email already exists',
  //   },
  //   201: {
  //     description: 'user created',
  //   },
  // })
  // public static async createUser(ctx: Context): Promise<void> {
  //   // get a user repository to perform operations with user
  //   const userRepository: Repository<User> =
  //     DataSourceInstance.getRepository(UserEntity)

  //   // build up entity user to be saved
  //   const userToBeSaved: User = new UserEntity()
  //   userToBeSaved.name = ctx.request.body.name
  //   userToBeSaved.email = ctx.request.body.email
  //   userToBeSaved.password = await passwordHelper.hashPassword(
  //     ctx.request.body.password
  //   )

  //   // validate user entity
  //   const errors: ValidationError[] = await validate(userToBeSaved) // errors is an array of validation errors
  //   if (errors.length > 0) {
  //     // return BAD REQUEST status code and errors array
  //     ctx.status = 400
  //     ctx.body = errors
  //   } else if (await userRepository.findOne({ email: userToBeSaved.email })) {
  //     // return BAD REQUEST status code and email already exists error
  //     ctx.status = 400
  //     ctx.body = 'The specified e-mail address already exists'
  //   } else {
  //     // save the user contained in the POST body
  //     const user = await userRepository.save(userToBeSaved)
  //     // return CREATED status code and updated user
  //     ctx.status = 201
  //     ctx.body = user;
  //   }
  // }

  // @request('put', '/users/{id}')
  // @summary('Update a user')
  // @path({
  //   id: { type: 'number', required: true, description: 'id of user' },
  // })
  // @body(userSchema)
  // @responses({
  //   201: { description: 'success' },
  //   400: {
  //     description: 'user does not exist / email conflict / validation error',
  //   },
  // })
  // public static async updateUser(ctx: Context): Promise<void> {
  //   // get a user repository to perform operations with user
  //   const userRepository: Repository<User> =
  //     getManager().getRepository(UserEntity)

  //   // update the user by specified id
  //   // build up entity user to be updated
  //   const userToBeUpdated: User = new UserEntity()
  //   userToBeUpdated.id = +ctx.params.id || 0 // will always have a number, this will avoid errors
  //   userToBeUpdated.name = ctx.request.body.name
  //   userToBeUpdated.email = ctx.request.body.email
  //   userToBeUpdated.password = await passwordHelper.hashPassword(
  //     ctx.request.body.password
  //   )

  //   // validate user entity
  //   const errors: ValidationError[] = await validate(userToBeUpdated) // errors is an array of validation errors

  //   if (errors.length > 0) {
  //     // return BAD REQUEST status code and errors array
  //     ctx.status = 400
  //     ctx.body = errors
  //   } else if (!(await userRepository.findOne(userToBeUpdated.id))) {
  //     // check if a user with the specified id exists
  //     // return a BAD REQUEST status code and error message
  //     ctx.status = 400
  //     ctx.body = "The user you are trying to update doesn't exist in the db"
  //   } else if (
  //     await userRepository.findOne({
  //       id: Not(Equal(userToBeUpdated.id)),
  //       email: userToBeUpdated.email,
  //     })
  //   ) {
  //     // return BAD REQUEST status code and email already exists error
  //     ctx.status = 400
  //     ctx.body = 'The specified e-mail address already exists'
  //   } else {
  //     // save the user contained in the PUT body
  //     const user = await userRepository.save(userToBeUpdated)
  //     // return CREATED status code and updated user
  //     ctx.status = 201
  //     ctx.body = user
  //   }
  // }

  // @request('delete', '/users/{id}')
  // @summary('Delete user by id')
  // @path({
  //   id: { type: 'number', required: true, description: 'id of user' },
  // })
  // @responses({
  //   204: {
  //     description: 'success',
  //   },
  //   400: {
  //     description: 'user does not exist'
  //   },
  //   403: {
  //     description: 'user can only be deleted by himself'
  //   }
  // })
  // public static async deleteUser(ctx: Context): Promise<void> {
  //   // get a user repository to perform operations with user
  //   const userRepository = getManager().getRepository(UserEntity)

  //   // find the user by specified id
  //   const userToRemove: User | undefined = await userRepository.findOne(
  //     +ctx.params.id || 0
  //   )
  //   if (!userToRemove) {
  //     // return a BAD REQUEST status code and error message
  //     ctx.status = 400
  //     ctx.body = "The user you are trying to delete doesn't exist in the db"
  //   } else if (ctx.state.user && ctx.state.user.email !== userToRemove.email) {
  //     // check user's token id and user id are the same
  //     // if not, return a FORBIDDEN status code and error message
  //     ctx.status = 403
  //     ctx.body = 'A user can only be deleted by himself'
  //   } else {
  //     // the user is there so can be removed
  //     await userRepository.remove(userToRemove)
  //     // return a NO CONTENT status code
  //     ctx.status = 204
  //   }
  // }

  // @request('delete', '/testusers')
  // @summary('Delete users generated by integration and load tests')
  // @responses({
  //   204: {description: 'success'}
  // })
  // public static async deleteTestUsers(ctx: Context): Promise<void> {
  //   // get a user repository to perform operations with user
  //   const userRepository = getManager().getRepository(UserEntity)

  //   // find test users
  //   const usersToRemove: User[] = await userRepository.find({
  //     where: { email: Like('%@citest.com') },
  //   })

  //   // the user is there so can be removed
  //   await userRepository.remove(usersToRemove)

  //   // return a NO CONTENT status code
  //   ctx.status = 204
  // }
}
