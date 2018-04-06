import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

import { processValue, VALIDATIONS } from './utilities';

export default new GraphQLScalarType({
  name: 'PositiveInt',

  description: 'Integers that will have a value greater than 0.',

  serialize(value) {
    return processValue(value, VALIDATIONS.PositiveInt);
  },

  parseValue(value) {
    return processValue(value, VALIDATIONS.PositiveInt);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate integers as positive integers but got a: ${
          ast.kind
        }`,
      );
    }

    return processValue(ast.value, VALIDATIONS.PositiveInt);
  },
});
