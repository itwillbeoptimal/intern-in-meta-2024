module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom'],  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    "^.+\\.svg$": "jest-transformer-svg",
  },
  transform: {
    '\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
