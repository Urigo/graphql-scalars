import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

function processValue(value, where) {
  if (isNaN(value)) {
    throw new TypeError(`${where} error: Value is not a number`);
  }

  if (value < 0) {
    throw new TypeError(`${where} error: Value is a negative number`);
  }

  return parseFloat(value);
}

export default new GraphQLScalarType({
  name: 'NonNegativeFloat',

  description: 'Floats that will have a value of 0 or more.',

  serialize(value) {
    return processValue(value, 'Field');
  },

  parseValue(value) {
    return processValue(value, 'Field');
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(`Query error: Can only validate floating point numbers as non-negative floating point numbers but got a: ${ast.kind}`);  // eslint-disable-line max-len
    }

    return processValue(ast.value, 'Query');
  },
});
