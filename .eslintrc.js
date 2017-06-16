module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "arrow-body-style": 1, // Sometimes we don't want to keep doing this
    "no-extra-parens": 0, // Interferes with jsx
    "no-underscore-dangle": 0, // Mongo _id
    "max-len": 1, // Sometimes necessary to have long strings and not risk whitespace
    "no-param-reassign": [2, { "props": false }], // Allows assignment of new properties
    "new-cap": 1, // Warning is good enough - we don't have any control over external packages doing this
    "import/named": 2, // Ensure named imports correspond to a named export in the remote file
    "import/no-extraneous-dependencies": 0, // https://github.com/benmosher/eslint-plugin-import/issues/479
    "import/extensions": ["off", "never"], // https://github.com/benmosher/eslint-plugin-import/issues/593
    "no-mixed-operators": 0, // Allow && || usage. e.g: const foo = a && a.foo || undefined;
  },
}
