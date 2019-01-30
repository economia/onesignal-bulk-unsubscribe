// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  projects: [
    {
      runner: 'jest-runner-eslint',
      displayName: 'lint',
      testMatch: ['<rootDir>/src/*.js', '<rootDir>/src/**/*.js'],
      watchPlugins: ['jest-runner-eslint/watch-fix'],
    },
    {
      displayName: 'test',
      clearMocks: true,
      collectCoverage: true,
      collectCoverageFrom: ['src/**/*.js'],
      coverageDirectory: 'coverage',
      coverageReporters: ['lcov'],
      testEnvironment: 'node',
    },
  ],
}
