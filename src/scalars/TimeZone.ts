import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';

const validateTimeZone = (str: string) => {
  if (!Intl?.DateTimeFormat().resolvedOptions().timeZone) {
    throw new Error('Time zones are not available in this environment');
  }

  try {
    Intl.DateTimeFormat(undefined, { timeZone: str });
    return str;
  } catch (ex) {
    if (ex instanceof RangeError) {
      throw new TypeError(`Value is not a valid IANA time zone: ${str}`);
    } else {
      throw new Error('Could not validate time zone.');
    }
  }
};

export const GraphQLTimeZone: GraphQLScalarType = /*#__PURE__*/ new GraphQLScalarType({
  name: 'TimeZone',

  description: 'A field whose value exists in the standard IANA Time Zone Database: https://www.iana.org/time-zones',

  serialize: validateTimeZone,

  parseValue: validateTimeZone,

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only sanitize time zone strings, but got: ${ast.kind}`);
    }

    return validateTimeZone(ast.value);
  },
  extensions: {
    codegenScalarType: 'string',
    jsonSchema: {
      title: 'TimeZone',
      type: 'string',
      pattern: '^(?:[A-Za-z0-9_]|(?:%[0-9A-Fa-f]{2}))+',
    },
  },
});
