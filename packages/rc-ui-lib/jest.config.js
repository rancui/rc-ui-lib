module.exports = {
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
  testPathIgnorePatterns: ['/es/', '/lib/', '/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/hooks/**',
    '!**/utils/**',
    '!**/demo/**',
    '!**/**/PropsType.ts',
    '!**/test/**',
  ],
  // testMatch: ['**/swipe-cell/__test__/**/*.spec.[jt]s?(x)'],
};
