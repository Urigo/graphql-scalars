import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

import { processValue, VALIDATIONS } from './utilities';

export default new GraphQLScalarType({
  name: 'NegativeFloat',

  description: 'Floats that will have a value less than 0.',

  serialize(value) {
    return processValue(value, VALIDATIONS.NegativeFloat);
  },

  parseValue(value) {
    return processValue(value, VALIDATIONS.NegativeFloat);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(
        `Can only validate floating point numbers as negative floating point numbers but got a: ${
          ast.kind
        }`,
      );
    }

    return processValue(ast.value, VALIDATIONS.NegativeFloat);
  },
});
