import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

import { processValue, VALUE_RANGES, VALUE_TYPES } from './utilities';

function _processValue(value) {
  return processValue(value, VALUE_RANGES.POSITIVE, VALUE_TYPES.FLOAT);
}

export default new GraphQLScalarType({
  name: 'PositiveFloat',

  description: 'Floats that will have a value greater than 0.',

  serialize(value) {
    return _processValue(value);
  },

  parseValue(value) {
    return _processValue(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(`Can only validate floating point numbers as positive floating point numbers but got a: ${ast.kind}`);  // eslint-disable-line max-len
    }

    return _processValue(ast.value);
  },
});
