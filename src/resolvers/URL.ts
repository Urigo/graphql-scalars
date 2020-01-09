import { GraphQLScalarType } from 'graphql/type/definition';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({
  name: 'URL',

  description:
    'A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.',

  serialize(value) {
    return new URL(value.toString()).toString();
  },

  parseValue: value => new URL(value.toString()),

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as URLs but got a: ${ast.kind}`,
      );
    }

    return new URL(ast.value.toString());
  },
});
