import bcrypt from 'bcrypt';
import { config } from '../config';

const hashPassword = (plainTextPassword: string): Promise<string> => {
    return new Promise((res, rej) => {
        bcrypt.hash(plainTextPassword, config.passwordSaltRounds, function(err, hash) {
            if (err) {
                rej(err.message);
            }
            res(hash);
        });
    })
}

export default {
    hashPassword,
}
