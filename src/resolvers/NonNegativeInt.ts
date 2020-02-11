import { Kind, GraphQLError, GraphQLScalarType } from 'graphql';
import { processValue, VALIDATIONS } from './utilities';

export default function (name = 'NonNegativeInt') {
  return new GraphQLScalarType({
    name,

    description: 'Integers that will have a value of 0 or more.',

    serialize(value) {
      return processValue(value, VALIDATIONS.NonNegativeInt);
    },

    parseValue(value) {
      return processValue(value, VALIDATIONS.NonNegativeInt);
    },

    parseLiteral(ast) {
      if (ast.kind !== Kind.INT) {
        throw new GraphQLError(
          `Can only validate integers as non-negative integers but got a: ${
          ast.kind
          }`,
        );
      }

      return processValue(ast.value, VALIDATIONS.NonNegativeInt);
    },
  });
}
