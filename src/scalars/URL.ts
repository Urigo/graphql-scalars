import { Kind, GraphQLError, GraphQLScalarType } from 'graphql';

export const GraphQLURL = /*#__PURE__*/ new GraphQLScalarType({
  name: 'URL',

  description:
    'A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.',

  serialize(value) {
    if (value) {
      return new URL(value.toString()).toString();
    } else {
      return value;
    }
  },

  parseValue: (value) => (value ? new URL(value.toString()) : value),

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as URLs but got a: ${ast.kind}`,
      );
    }

    if (ast.value) {
      return new URL(ast.value.toString());
    } else {
      return ast.value;
    }
  },
});
