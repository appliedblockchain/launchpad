
import { validate } from 'class-validator'
import { Context } from 'koa'
import { getManager } from 'typeorm'

import UserController from '../../src/controller/user'
import { UserEntity } from '../../src/entity/user'

import { getSampleData, SampleDataFormat } from '../sample'
import { mock } from '../mock';

const sampleData: SampleDataFormat = getSampleData()

const mockFns = mock();
mockFns.bcrypt();

jest.mock('class-validator', () => {
  const doNothing = () => {
    //Empty function that mocks typeorm annotations
  }

  return {
    validate: jest.fn(),
    Length: doNothing,
    IsEmail: doNothing,
  }
})

jest.mock('typeorm', () => {
  const doNothing = () => {
    //Empty function that mocks typeorm annotations
  }

  return {
    getManager: jest.fn(),
    PrimaryGeneratedColumn: doNothing,
    Column: doNothing,
    Entity: doNothing,
    Equal: doNothing,
    Not: doNothing,
    Like: doNothing,
  }
})

describe('User controller', () => {
  it('getUsers should return status 200 and found users.', async () => {
    const userRepository = { find: jest.fn().mockReturnValue([sampleData.userToSave]) }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    const context = { status: undefined, body: undefined } as Context

    await UserController.getUsers(context)
    
    expect(userRepository.find).toHaveBeenCalledTimes(1)
    expect(context.status).toBe(200)
    expect(context.body).toStrictEqual([sampleData.userToSave])
  })

  it('getUser should return status 200 and single user found by id.', async () => {
    const userRepository = { findOne: jest.fn().mockReturnValue(sampleData.userToSave) }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    const context = {
      status: undefined,
      body: undefined,
      params: { id: 0 },
    } as unknown as Context
    await UserController.getUser(context)
    expect(userRepository.findOne).toHaveBeenCalledTimes(1)
    expect(context.status).toBe(200)
    expect(context.body).toStrictEqual(sampleData.userToSave)
  })

  it('getUser should return status 400 if no user found and message.', async () => {
    const userRepository = { findOne: jest.fn().mockReturnValue(undefined) }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    const context = {
      status: undefined,
      body: undefined,
      params: { id: 0 },
    } as unknown as Context

    await UserController.getUser(context)

    expect(userRepository.findOne).toHaveBeenCalledTimes(1)
    expect(context.status).toBe(400)
    expect(context.body).toBe(
      "The user you are trying to retrieve doesn't exist in the db"
    )
  })

  it('createUser should return status 201 if is created.', async () => {
    const userRepository = {
      save: jest.fn().mockReturnValue(sampleData.userToSave),
      findOne: () => undefined as UserEntity,
    }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    ;(validate as jest.Mock).mockReturnValue([])
    // ;(password as jest.Mock).mockReturnValue("hashedTestExample12345")
    const context = {
      status: undefined,
      body: undefined,
      request: { body: sampleData.userToSave },
    } as unknown as Context

    await UserController.createUser(context)

    expect(userRepository.save).toHaveBeenCalledTimes(1)
    expect(context.status).toBe(201)
    expect(context.body).toStrictEqual(sampleData.userToSave)
  })

  it('createUser should return status 400 if there are validation errors.', async () => {
    const userRepository = {
      save: jest.fn().mockReturnValue(sampleData.userToSave),
      findOne: () => undefined as UserEntity,
    }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    ;(validate as jest.Mock).mockReturnValue(['email validation error'])
    const context = {
      status: undefined,
      body: undefined,
      request: { body: sampleData.userToSave },
    } as unknown as Context
    await UserController.createUser(context)
    expect(userRepository.save).toHaveBeenCalledTimes(0)
    expect(context.status).toBe(400)
    expect(context.body).toStrictEqual(['email validation error'])
  })

  it('createUser should return status 400  if user already exists.', async () => {
    const userRepository = {
      save: jest.fn().mockReturnValue(sampleData.userToSave),
      findOne: () => sampleData.userToSave,
    }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    ;(validate as jest.Mock).mockReturnValue([])
    const context = {
      status: undefined,
      body: undefined,
      request: { body: sampleData.userToSave },
    } as unknown as Context
    await UserController.createUser(context)
    expect(userRepository.save).toHaveBeenCalledTimes(0)
    expect(context.status).toBe(400)
    expect(context.body).toStrictEqual(
      'The specified e-mail address already exists'
    )
  })

  it('updateUser should return 201 if user is updated.', async () => {
    const userRepository = {
      findOne: jest
        .fn()
        .mockReturnValueOnce(sampleData.userToSave)
        .mockReturnValueOnce(undefined as UserEntity),
      save: jest.fn().mockReturnValue(sampleData.userToSave),
    }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    ;(validate as jest.Mock).mockReturnValue([])
    const context = {
      status: undefined,
      body: undefined,
      params: { id: 0 },
      request: { body: sampleData.userToSave },
    } as unknown as Context
    await UserController.updateUser(context)
    expect(userRepository.findOne).toHaveBeenCalledTimes(2)
    expect(userRepository.save).toHaveBeenCalledTimes(1)
    expect(context.status).toBe(201)
    expect(context.body).toStrictEqual(sampleData.userToSave)
  })

  it('updateUser should return 400 if there are validation errors.', async () => {
    const userRepository = { save: jest.fn().mockReturnValue(sampleData.userToSave) }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    ;(validate as jest.Mock).mockReturnValue(['email validation error'])
    const context = {
      status: undefined,
      body: undefined,
      params: { id: 0 },
      request: { body: sampleData.userToSave },
    } as unknown as Context
    await UserController.updateUser(context)
    expect(userRepository.save).toHaveBeenCalledTimes(0)
    expect(context.status).toBe(400)
    expect(context.body).toStrictEqual(['email validation error'])
  })

  it('updateUser should return 400 if user does not exist.', async () => {
    const userRepository = {
      findOne: jest.fn().mockReturnValue(undefined as UserEntity),
    }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    ;(validate as jest.Mock).mockReturnValue([])
    const context = {
      status: undefined,
      body: undefined,
      params: { id: 0 },
      request: { body: sampleData.userToSave },
    } as unknown as Context
    await UserController.updateUser(context)
    expect(userRepository.findOne).toHaveBeenCalledTimes(1)
    expect(context.status).toBe(400)
    expect(context.body).toStrictEqual(
      "The user you are trying to update doesn't exist in the db"
    )
  })

  it('updateUser should return 400 email is already in use.', async () => {
    const userRepository = {
      findOne: jest
        .fn()
        .mockReturnValue({ id: 1, email: 'johndoe@gmail.com' } as UserEntity),
    }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    ;(validate as jest.Mock).mockReturnValue([])
    const context = {
      status: undefined,
      body: undefined,
      params: { id: 0 },
      request: { body: sampleData.userToSave },
    } as unknown as Context
    await UserController.updateUser(context)
    expect(userRepository.findOne).toHaveBeenCalledTimes(2)
    expect(context.status).toBe(400)
    expect(context.body).toStrictEqual(
      'The specified e-mail address already exists'
    )
  })

  it('deleteUser should return status 400 if user does not exists.', async () => {
    const userRepository = {
      remove: jest.fn().mockReturnValue(undefined),
      findOne: () => undefined as UserEntity,
    }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    const context = {
      status: undefined,
      body: undefined,
      params: { id: 0 },
      state: { user: sampleData.userToSave },
    } as unknown as Context
    await UserController.deleteUser(context)
    expect(userRepository.remove).toHaveBeenCalledTimes(0)
    expect(context.status).toBe(400)
    expect(context.body).toStrictEqual(
      "The user you are trying to delete doesn't exist in the db"
    )
  })

  it('deleteUser should return status 204 if user has been removed.', async () => {
    const userRepository = {
      remove: jest.fn().mockReturnValue(undefined),
      findOne: () => sampleData.userToSave,
    }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    const context = {
      status: undefined,
      body: undefined,
      params: { id: 0 },
      state: { user: sampleData.userToSave },
    } as unknown as Context
    await UserController.deleteUser(context)
    expect(userRepository.remove).toHaveBeenCalledTimes(1)
    expect(context.status).toBe(204)
  })

  it('deleteUser should return status 403 if user has no permission.', async () => {
    const userRepository = {
      findOne: jest
        .fn()
        .mockReturnValue({ email: 'different_email@gmail.com' }),
    }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    const context = {
      status: undefined,
      body: undefined,
      params: { id: 0 },
      state: { user: 'johndoe@gmail.com' } as unknown as UserEntity,
    } as unknown as Context
    await UserController.deleteUser(context)
    expect(context.status).toBe(403)
    expect(context.body).toBe('A user can only be deleted by himself')
  })

  it('deleteTestUsers should return status 204 and remove users.', async () => {
    const userRepository = {
      remove: jest.fn().mockReturnValue(undefined),
      find: () => [] as UserEntity[],
    }
    ;(getManager as jest.Mock).mockReturnValue({
      getRepository: () => userRepository,
    })
    const context = {
      status: undefined,
      body: undefined,
      params: { id: 0 },
      state: { user: sampleData.userToSave },
    } as unknown as Context
    await UserController.deleteTestUsers(context)
    expect(userRepository.remove).toHaveBeenCalledTimes(1)
    expect(context.status).toBe(204)
  })
})