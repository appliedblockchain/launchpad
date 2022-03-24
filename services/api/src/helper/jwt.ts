import { UserEntity } from "entity/user"
import { config } from '../config'
import jwt from 'jsonwebtoken'

const getAccessToken = (user: UserEntity) => {
    const { password, ...userWithoutPassword } = user;
    return jwt.sign(userWithoutPassword, config.jwtSecret);
}
export default {
    getAccessToken,
}