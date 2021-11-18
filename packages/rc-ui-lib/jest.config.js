module.exports = {
  setupFiles: ['./tests/setup.js'],
  setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
  testPathIgnorePatterns: ['/es/', '/lib/', '<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/hooks/**',
    '!src/utils/**',
    '!**/demo/**',
    '!src/**/PropsType.ts',
    '!src/**/index.tsx',
  ],
};
