import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({
  name: 'DateTime',

  description: 'Use JavaScript Date object for date/tiem fields.',

  serialize(value) {
    if (!(value instanceof Date)) {
      throw new TypeError(`Value is not an instance of Date: ${value}`);
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(value.getTime())) {
      throw new TypeError(`Value is not a valid Date: ${value}`);
    }

    return value.toJSON();
  },

  parseValue(value) {
    const date = new Date(value);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(date.getTime())) {
      throw new TypeError(`Value is not a valid Date: ${value}`);
    }

    return date;
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only parse strings to dates but got a: ${ast.kind}`,
      );
    }

    const result = new Date(ast.value);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(result.getTime())) {
      throw new GraphQLError(`Value is not a valid Date: ${ast.value}`);
    }

    if (ast.value !== result.toJSON()) {
      throw new GraphQLError(
        `Value is not a valid Date format (YYYY-MM-DDTHH:MM:SS.SSSZ): ${
          ast.value
        }`,
      );
    }

    return result;
  },
});
