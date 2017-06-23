import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

function processValue(value) {
  if (isNaN(value)) {
    throw new TypeError(`Value is not a number: ${value}`);
  }

  if (value < 0) {
    throw new TypeError(`Value is a negative number: ${value}`);
  }

  return parseInt(value, 10);
}

export default new GraphQLScalarType({
  name: 'NonNegativeInt',

  description: 'Integers that will have a value of 0 or more.',

  serialize(value) {
    return processValue(value);
  },

  parseValue(value) {
    return processValue(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(`Can only validate integers as non-negative integers but got a: ${ast.kind}`);  // eslint-disable-line max-len
    }

    return processValue(ast.value);
  },
});
