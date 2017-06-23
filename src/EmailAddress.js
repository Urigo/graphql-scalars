import { GraphQLScalarType } from 'graphql';
import GraphQLError from 'graphql/error';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({
  name: 'EmailAddress',

  // eslint-disable-next-line max-len
  description: 'A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.',

  serialize(value) {
    // TODO: regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // if (!(value instanceof Date)) {
    //   throw new TypeError('Field error: value is not an instance of Date');
    // }
    //
    // if (isNaN(value.getTime())) {
    //   throw new TypeError('Field error: value is an invalid Date');
    // }

    return value.toJSON();
  },

  parseValue(value) {
    // const date = new Date(value);
    //
    // if (isNaN(date.getTime())) {
    //   throw new TypeError('Field error: value is an invalid Date');
    // }

    return date;
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError.GraphQLError(`Query error: Can only parse strings to dates but got a: ${ast.kind}`);
    }

    // const result = new Date(ast.value);
    //
    // if (isNaN(result.getTime())) {
    //   throw new GraphQLError.GraphQLError('Query error: Invalid date');
    // }

    if (ast.value !== result.toJSON()) {
      throw new GraphQLError('Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ');
    }

    return result;
  },
});
