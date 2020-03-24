// Based on https://github.com/stems/graphql-bigint/

import { Kind, GraphQLScalarType } from 'graphql';

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

export default function (name = 'BigInt') {
  BigInt.prototype.toJSON =
    BigInt.prototype.toJSON ||
    function (this: bigint) {
      return this.toString();
    };
  return new GraphQLScalarType({
    name,
    description:
      'The `BigInt` scalar type represents non-fractional signed whole numeric values.',
    serialize: BigInt,
    parseValue: BigInt,
    parseLiteral(ast) {
      if (
        ast.kind === Kind.INT ||
        ast.kind === Kind.FLOAT ||
        ast.kind === Kind.STRING
      ) {
        return BigInt(ast.value);
      }
      return null;
    },
  });
}
