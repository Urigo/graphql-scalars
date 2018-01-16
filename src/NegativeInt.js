import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

function processValue(value) {
  if (isNaN(value)) {
    throw new TypeError(`Value is not a number: ${value}`);
  }

  if (!(value < 0)) {
    throw new TypeError(`Value is not a negative number: ${value}`);
  }

  return parseInt(value, 10);
}

export default new GraphQLScalarType({
  name: 'PositiveInt',

  description: 'Integers that will have a value less than 0.',

  serialize(value) {
    return processValue(value);
  },

  parseValue(value) {
    return processValue(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(`Can only validate integers as negative integers but got a: ${ast.kind}`);  // eslint-disable-line max-len
    }

    return processValue(ast.value);
  },
});
