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

  return parseFloat(value);
}

export default new GraphQLScalarType({
  name: 'NonNegativeFloat',

  description: 'Floats that will have a value of 0 or more.',

  serialize(value) {
    return processValue(value);
  },

  parseValue(value) {
    return processValue(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(`Can only validate floating point numbers as non-negative floating point numbers but got a: ${ast.kind}`);  // eslint-disable-line max-len
    }

    return processValue(ast.value);
  },
});
