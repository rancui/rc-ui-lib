module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./tests/setupAfterEnv.ts', './tests/setupPointerEvent.ts'],
  testPathIgnorePatterns: ['/es/', '/lib/', '/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/hooks/**',
    '!**/utils/**',
    '!**/demo/**',
    '!**/**/PropsType.ts',
    '!**/test/**',
  ],
};
