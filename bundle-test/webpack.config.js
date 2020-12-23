const { resolve } = require('path');

module.exports = {
  mode: 'production',
  output: {
    filename: 'index.js',
  },
  resolve: {
    alias: {
      'graphql-scalars': resolve(__dirname, '../dist'),
    },
    modules: ['node_modules', '../node_modules'],
  },
};
