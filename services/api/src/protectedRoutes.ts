import Router from '@koa/router'

import { user } from './controller'

const protectedRouter = new Router()

protectedRouter.get('/users', user.getUsers)
// protectedRouter.get('/users/:id', user.getUser)
// protectedRouter.post('/users', user.createUser)
// protectedRouter.put('/users/:id', user.updateUser)
// protectedRouter.delete('/users/:id', user.deleteUser)
// protectedRouter.delete('/testusers', user.deleteTestUsers)


export { protectedRouter }
