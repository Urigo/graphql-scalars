import { Kind, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

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
  if (!BigInt.prototype.toJSON) {
    BigInt.prototype.toJSON =
      BigInt.prototype.toJSON ||
      function (this: bigint) {
        return this.toString();
      };
  }
}

function coerceBitIntValue(value: string | number | bigint): number | bigint {
  if (isBigIntAvailable()) {
    patchBigInt();
    return BigInt(value);
  } else {
    return Number(value);
  }
}

function parseBigIntValue(value: string): number | bigint {
  return coerceBitIntValue(value);
}

function serializeBigInt(value: string | number | bigint): string {
  return coerceBitIntValue(value).toString();
}

export const GraphQLBigIntConfig: GraphQLScalarTypeConfig<
  string | number | bigint,
  string
> = /*#__PURE__*/ {
  name: 'BigInt',
  description:
    'The `BigInt` scalar type represents non-fractional signed whole numeric values.',
  serialize: serializeBigInt,
  parseValue: parseBigIntValue,
  parseLiteral(ast) {
    if (
      ast.kind === Kind.INT ||
      ast.kind === Kind.FLOAT ||
      ast.kind === Kind.STRING
    ) {
      return parseBigIntValue(ast.value);
    }
    return null;
  },
};

export const GraphQLBigInt = /*#__PURE__*/ new GraphQLScalarType(
  GraphQLBigIntConfig,
);
