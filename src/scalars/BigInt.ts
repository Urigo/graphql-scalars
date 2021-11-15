import {
  Kind,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  GraphQLError,
  print,
} from 'graphql';
import { serializeObject } from './utilities';

declare global {
  interface BigInt {
    toJSON(): number;
  }
}

function patchBigInt() {
  if (!BigInt.prototype.toJSON) {
    BigInt.prototype.toJSON = function () {
      return Number(this);
    };
  }
}

export const GraphQLBigIntConfig: GraphQLScalarTypeConfig<
  bigint,
  bigint | string
> = /*#__PURE__*/ {
  name: 'BigInt',
  description:
    'The `BigInt` scalar type represents non-fractional signed whole numeric values.',
  serialize(outputValue) {
    patchBigInt();
    const coercedValue = serializeObject(outputValue);

    let num = coercedValue;

    if (typeof coercedValue === 'boolean') {
      num = coercedValue ? 1 : 0;
    }

    if (typeof coercedValue === 'string' && coercedValue !== '') {
      num = BigInt(coercedValue);
      if (num.toString() !== coercedValue) {
        throw new GraphQLError(
          `BigInt cannot represent non-integer value: ${coercedValue}`,
        );
      }
    }

    if (typeof coercedValue === 'number') {
      if (!Number.isInteger(coercedValue)) {
        throw new GraphQLError(
          `BigInt cannot represent non-integer value: ${coercedValue}`,
        );
      }
      num = BigInt(coercedValue);
    }

    if (typeof num !== 'bigint') {
      throw new GraphQLError(
        `BigInt cannot represent non-integer value: ${coercedValue}`,
      );
    }

    return num;
  },
  parseValue(inputValue) {
    const num = BigInt(inputValue.toString());
    if (inputValue.toString() !== num.toString()) {
      throw new GraphQLError(`BigInt cannot represent value: ${inputValue}`);
    }
    return num;
  },
  parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.INT) {
      throw new GraphQLError(
        `BigInt cannot represent non-integer value: ${print(valueNode)}`,
        valueNode,
      );
    }
    const num = BigInt(valueNode.value);
    if (num.toString() !== valueNode.value) {
      throw new GraphQLError(
        `BigInt cannot represent value: ${valueNode.value}`,
        valueNode,
      );
    }
    return num;
  },
  extensions: {
    codegenScalarType: 'bigint',
  },
};

export const GraphQLBigInt: GraphQLScalarType =
  /*#__PURE__*/ new GraphQLScalarType(GraphQLBigIntConfig);
