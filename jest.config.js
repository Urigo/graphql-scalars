BigInt.prototype.toJSON = function () {
  return this.toString();
};

module.exports = {
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist'],
};
