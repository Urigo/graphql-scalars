import { Kind, GraphQLError, GraphQLScalarType } from 'graphql';
import { IPV4_REGEX } from './IPv4';
import { IPV6_REGEX } from './IPv6';

const validate = (value: any) => {
  if (typeof value !== 'string') {
    throw new TypeError(`Value is not string: ${value}`);
  }

  if (!IPV4_REGEX.test(value) && !IPV6_REGEX.test(value)) {
    throw new TypeError(`Value is not a valid IPv4 or IPv6 address: ${value}`);
  }

  return value;
};

export const GraphQLIP: GraphQLScalarType = /*#__PURE__*/ new GraphQLScalarType({
  name: `IP`,

  description: `A field whose value is either an IPv4 or IPv6 address: https://en.wikipedia.org/wiki/IP_address.`,

  serialize(value) {
    return validate(value);
  },

  parseValue(value) {
    return validate(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as IP addresses but got a: ${ast.kind}`);
    }

    return validate(ast.value);
  },
  extensions: {
    codegenScalarType: 'string',
  },
});
