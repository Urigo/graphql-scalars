import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

import { processValue, VALIDATIONS } from './utilities';

export default new GraphQLScalarType({
  name: 'NonPositiveInt',

  description: 'Integers that will have a value of 0 or less.',

  serialize(value) {
    return processValue(value, VALIDATIONS.NonPositiveInt);
  },

  parseValue(value) {
    return processValue(value, VALIDATIONS.NonPositiveInt);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate integers as non-positive integers but got a: ${
          ast.kind
        }`,
      );
    }

    return processValue(ast.value, VALIDATIONS.NonPositiveInt);
  },
});
