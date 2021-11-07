module.exports = {
  setupFiles: ['./tests/setup.js'],
  setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
  testPathIgnorePatterns: ['/es/', '/lib/', '<rootDir>/node_modules/'],
};
