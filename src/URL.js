import GraphQLScalarType from 'graphql';
import GraphQLError from 'graphql/error';
import Kind from 'graphql/language';

export default new GraphQLScalarType.GraphQLScalarType({
  name: 'URL',

  serialize(value) {
    // TODO: regex: [-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)
    // Use: https://github.com/unshiftio/url-parse ?
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
    if (ast.kind !== Kind.Kind.STRING) {
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
