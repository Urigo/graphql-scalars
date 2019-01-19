module.exports = {
  extends: 'airbnb',
  rules: {
    'implicit-arrow-linebreak': 'off',
    'linebreak-style': 'off', // Airbnb specifies Unix style line endings, turn this off for Windows users
    'function-paren-newline': 'off',
    'import/extensions': ['off', 'never'], // https://github.com/benmosher/eslint-plugin-import/issues/593
    'import/named': 'error', // Ensure named imports correspond to a named export in the remote file
    'import/no-extraneous-dependencies': 'off', // https://github.com/benmosher/eslint-plugin-import/issues/479
    'new-cap': 'warn', // Warning is good enough - we don't have any control over external packages doing this
    'no-mixed-operators': 'off', // Allow && || usage. e.g: const foo = a && a.foo || undefined;
    'no-param-reassign': ['error', { props: false }], // Allows assignment of new properties
    'no-underscore-dangle': 'off', // Mongo _id
    'operator-linebreak': 'off',
  },
};
