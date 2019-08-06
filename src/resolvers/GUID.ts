import { GraphQLScalarType, GraphQLError, Kind  } from 'graphql';

const GUID_REGEX = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i;

const validate = (value: any) => {
    if (typeof value !== 'string') {
        throw new TypeError(`Value is not string: ${value}`);
    }

    if (!(GUID_REGEX.test(value))) {
        throw new TypeError(`Value is not a valid GUID: ${value}`);
    }

    return value;
};

export default new GraphQLScalarType({
  name: `GUID`,

  description: `A field whose value is a generic Globally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier.`,

  serialize(value) {
    return validate(value);
  },

  parseValue(value) {
    return validate(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as GUIDs but got a: ${ast.kind}`);
    }

    return validate(ast.value);
  }
});
