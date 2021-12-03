module.exports = {
  setupFiles: ['./tests/setup.js'],
  setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
  testPathIgnorePatterns: ['/es/', '/lib/', '<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/hooks/**',
    '!**/utils/**',
    '!**/demo/**',
    '!**/**/PropsType.ts',
    '!**/**/index.tsx',
  ],
};
