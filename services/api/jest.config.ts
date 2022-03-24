import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  roots: ['<rootDir>'],
  testMatch: ['**/tests/**/*.test.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
export default config
