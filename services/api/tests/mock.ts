import bcrypt from 'bcrypt';

export const BCRYPT_MOCK_PASSWORD = 'abcdfeghjki';

export function mock() {
    return {
        bcrypt: () => jest.spyOn(bcrypt, 'hash').mockImplementation((pass, salt, cb) => cb(null, BCRYPT_MOCK_PASSWORD))
    }
};
