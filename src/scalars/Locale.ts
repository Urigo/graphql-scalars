import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import tags from 'language-tags';

function validateLanguageTag(value: any) {
  if (tags(value).valid()) {
    return value;
  }
  throw new TypeError(`Value is not a valid Locale: ${value}`);
}

export const GraphQLLocale = /*#__PURE__*/ new GraphQLScalarType({
  name: 'Locale',
  description:
    "A Locale language tag as specified in IETF BCP 47 (RFC 5646) defining the user's language, " +
    'region and any special variant preferences, e.g. en-US or fr',
  serialize: validateLanguageTag,
  parseValue: validateLanguageTag,
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return validateLanguageTag(ast.value);
    }
    throw new GraphQLError(
      `Can only validate strings as locale language tag but got a: ${ast.kind}`,
    );
  },
  extensions: { codegenScalarType: 'string' },
});
