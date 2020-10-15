import { GraphQLScalarType, Kind, GraphQLError } from 'graphql';
import { DateTime } from 'luxon';

function validateLocalTime(value: any) {
  if (typeof value !== 'string') {
    throw new TypeError(`Value is not string: ${value}`);
  }

  const validFormats = ['HH:mm', 'HH:mm:ss', 'HH:mm:ss.SSS'];
  const isValidTime = validFormats.some(
    (format) => DateTime.fromFormat(value, format).isValid,
  );
  if (!isValidTime) {
    throw new TypeError(`Value is not a valid LocalTime: ${value}`);
  }

  return value;
}

export const GraphQLLocalTime = /*#__PURE__*/ new GraphQLScalarType({
  name: 'LocalTime',
  description:
    'A local time string (i.e., with no associated timezone) in 24-hr "HH:mm[:ss[.SSS]]" format, e.g. "14:25"',

  serialize(value) {
    // value sent to client as string
    return validateLocalTime(value);
  },

  parseValue(value) {
    // value from client as json
    return validateLocalTime(value);
  },

  parseLiteral(ast) {
    // value from client in ast
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as local times but got a: ${ast.kind}`,
      );
    }

    return validateLocalTime(ast.value);
  },
});
