import { UserEntity } from "entity/user"
import jwt from 'jsonwebtoken'

import { config } from '../config'

const getAccessToken = (user: UserEntity) => {
    const { password, ...userWithoutPassword } = user;
    return jwt.sign(userWithoutPassword, config.jwtSecret);
}
export default {
    getAccessToken,
}