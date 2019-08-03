import { GraphQLScalarType, GraphQLError, Kind  } from 'graphql';
import { assert, string } from '@hapi/joi';

const validate = (value: any) => {
  assert(value, string(), new TypeError(`Value is not string: ${value}`));
  assert(value, string().guid(), new TypeError(`Value is not a valid GUID: ${value}`));
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
