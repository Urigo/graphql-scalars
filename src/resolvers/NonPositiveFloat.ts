import { Kind, GraphQLError, GraphQLScalarType } from 'graphql';
import { processValue, VALIDATIONS } from './utilities';

export default new GraphQLScalarType({
  name: 'NonPositiveFloat',

  description: 'Floats that will have a value of 0 or less.',

  serialize(value) {
    return processValue(value, VALIDATIONS.NonPositiveFloat);
  },

  parseValue(value) {
    return processValue(value, VALIDATIONS.NonPositiveFloat);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT && ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate floating point numbers as non-positive floating point numbers but got a: ${
          ast.kind
        }`,
      );
    }

    return processValue(ast.value, VALIDATIONS.NonPositiveFloat);
  },
});
