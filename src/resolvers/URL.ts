import { GraphQLScalarType } from 'graphql/type/definition';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

const coerceURL = (value: any) => {
  // tslint:disable-next-line: no-eval
  let URLCtor = typeof URL === 'undefined' ? eval(`require('url')`).URL : URL;
  return new URLCtor(value.toString());
};

export default new GraphQLScalarType({
  name: 'URL',

  description:
    'A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.',

  serialize(value) {
    return coerceURL(value).toString();
  },

  parseValue: coerceURL,

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as URLs but got a: ${ast.kind}`,
      );
    }

    return coerceURL(ast.value);
  },
});
