import { Kind, GraphQLError, GraphQLScalarType } from 'graphql';
import { processValue, VALIDATIONS } from './utilities';

export default new GraphQLScalarType({
  name: 'PositiveFloat',

  description: 'Floats that will have a value greater than 0.',

  serialize(value) {
    return processValue(value, VALIDATIONS.PositiveFloat);
  },

  parseValue(value) {
    return processValue(value, VALIDATIONS.PositiveFloat);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT && ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate floating point numbers as positive floating point numbers but got a: ${
          ast.kind
        }`,
      );
    }

    return processValue(ast.value, VALIDATIONS.PositiveFloat);
  },
});
