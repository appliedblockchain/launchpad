import type { Config } from '@jest/types'

import globalConfig from './jest.config';

const config: Config.InitialOptions = {
  ...globalConfig,
  testMatch: ['**/tests/unit/**/*.+(ts|tsx|js)'],
}
export default config
