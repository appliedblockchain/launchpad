module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
//   globalSetup: './tests/config/setup.db.ts',
  roots: ['<rootDir>'],
  testMatch: ['**/tests/**/*.test.+(ts|tsx|js)'],
  testPathIgnorePatterns: ['./tests/config/*'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
