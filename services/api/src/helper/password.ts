import { User } from '@launchpad-ts/shared-types'
import bcrypt from 'bcrypt'

import { config } from '../config'

const hashPassword = (plainTextPassword: string): Promise<string> => {
  return new Promise((res, rej) => {
    bcrypt.hash(
      plainTextPassword,
      config.passwordSaltRounds,
      function (err, hash) {
        if (err) {
          rej(err.message)
        }
        res(hash)
      }
    )
  })
}

const validatePassword = (user: User, password: string): Promise<boolean> => {
  return bcrypt.compare(password, user.password)
}
export default {
  hashPassword,
  validatePassword,
}
