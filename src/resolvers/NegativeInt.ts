import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

import { processValue, VALIDATIONS } from './utilities';

export default new GraphQLScalarType({
  name: 'NegativeInt',

  description: 'Integers that will have a value less than 0.',

  serialize(value) {
    return processValue(value, VALIDATIONS.NegativeInt);
  },

  parseValue(value) {
    return processValue(value, VALIDATIONS.NegativeInt);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate integers as negative integers but got a: ${
          ast.kind
        }`,
      );
    }

    return processValue(ast.value, VALIDATIONS.NegativeInt);
  },
});
