import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

import { processValue, VALIDATIONS } from './utilities';

export default new GraphQLScalarType({
  name: 'NonNegativeFloat',

  description: 'Floats that will have a value of 0 or more.',

  serialize(value) {
    return processValue(value, VALIDATIONS.NonNegativeFloat);
  },

  parseValue(value) {
    return processValue(value, VALIDATIONS.NonNegativeFloat);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(
        `Can only validate floating point numbers as non-negative floating point numbers but got a: ${
          ast.kind
        }`,
      );
    }

    return processValue(ast.value, VALIDATIONS.NonNegativeFloat);
  },
});
