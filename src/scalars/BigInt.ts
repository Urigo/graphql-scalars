import { Kind, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

declare global {
  interface BigInt {
    toJSON(): string;
  }
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
function coerceBigIntValue(value: bigint | number | string) {
  patchBigInt();
  return BigInt(value);
}

export const GraphQLBigIntConfig: GraphQLScalarTypeConfig<
  number | string | bigint,
  bigint | number
> = /*#__PURE__*/ {
  name: 'BigInt',
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
};

export const GraphQLBigInt = /*#__PURE__*/ new GraphQLScalarType(
  GraphQLBigIntConfig,
);
