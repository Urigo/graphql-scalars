const path = require('path');

module.exports = {
  target: 'node',
  output: {
    filename: 'index.js',
  },
  resolve: {
    alias: {
      'graphql-scalars': path.join(__dirname, '../dist/esnext/index.js'),
    },
    modules: ['node_modules', '../node_modules'],
  },
};
