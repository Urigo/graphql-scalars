import { GraphQLScalarType, Kind, GraphQLError } from 'graphql';
import { DateTime } from 'luxon';

function validateLocalDate(value: any) {
  if (typeof value !== 'string') {
    throw new TypeError(`Value is not string: ${value}`);
  }

  const isValidDate = DateTime.fromFormat(value, 'yyyy-MM-dd').isValid;
  if (!isValidDate) {
    throw new TypeError(`Value is not a valid LocalDate: ${value}`);
  }

  return value;
}

export const GraphQLLocalDate = /*#__PURE__*/ new GraphQLScalarType({
  name: 'LocalDate',
  description:
    'A local date string (i.e., with no associated timezone) in "YYYY-MM-DD" format, e.g. "2020-01-01".',

  serialize(value) {
    // value sent to client as string
    return validateLocalDate(value);
  },

  parseValue(value) {
    // value from client as json
    return validateLocalDate(value);
  },

  parseLiteral(ast) {
    // value from client in ast
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as local dates but got a: ${ast.kind}`,
      );
    }

    return validateLocalDate(ast.value);
  },
});
