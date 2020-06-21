// Based on https://github.com/stems/graphql-bigint/

import { Kind, GraphQLScalarType } from 'graphql';

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

function isBigIntAvailable() {
  return (
    (typeof global === 'object' && (global as any).BigInt) ||
    (typeof window === 'object' && (window as any).BigInt)
  );
}

function patchBigInt() {
  if (isBigIntAvailable()) {
    if (!BigInt.prototype.toJSON) {
      BigInt.prototype.toJSON =
        BigInt.prototype.toJSON ||
        function (this: bigint) {
          return this.toString();
        };
    }
  }
}

function coerceBigIntValue(value: bigint | number | string) {
  if (isBigIntAvailable()) {
    return BigInt(value);
  } else {
    return Number(value);
  }
}

export default function (name = 'BigInt') {
  patchBigInt();
  return new GraphQLScalarType({
    name,
    description:
      'The `BigInt` scalar type represents non-fractional signed whole numeric values.',
    serialize: coerceBigIntValue,
    parseValue: coerceBigIntValue,
    parseLiteral(ast) {
      if (
        ast.kind === Kind.INT ||
        ast.kind === Kind.FLOAT ||
        ast.kind === Kind.STRING
      ) {
        return coerceBigIntValue(ast.value);
      }
      return null;
    },
  });
}
