import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

import { processValue, VALUE_RANGES, VALUE_TYPES } from './utilities';

function _processValue(value) {
  return processValue(value, VALUE_RANGES.NON_NEGATIVE, VALUE_TYPES.FLOAT);
}

export default new GraphQLScalarType({
  name: 'NonNegativeFloat',

  description: 'Floats that will have a value of 0 or more.',

  serialize(value) {
    return _processValue(value);
  },

  parseValue(value) {
    return _processValue(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(`Can only validate floating point numbers as non-negative floating point numbers but got a: ${ast.kind}`);  // eslint-disable-line max-len
    }

    return _processValue(ast.value);
  },
});
