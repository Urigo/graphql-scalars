import { GraphQLScalarType } from 'graphql';
import GraphQLError from 'graphql/error';
import { Kind } from 'graphql/language';

function processValue(value, where) {
  if (isNaN(value)) {
    throw new TypeError(`${where} error: Value is not a number`);
  }

  if (!(value > 0)) {
    throw new TypeError(`${where} error: Value is not a positive number`);
  }

  return parseFloat(value);
}

export default new GraphQLScalarType({
  name: 'PositiveFloat',

  description: 'Floats that will have a value greater than 0.',

  serialize(value) {
    return processValue(value, 'Field');
  },

  parseValue(value) {
    return processValue(value, 'Field');
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError.GraphQLError(`Query error: Can only validate floating point numbers as positive floating point numbers but got a: ${ast.kind}`);  // eslint-disable-line max-len
    }

    return processValue(ast.value, 'Query');
  },
});
