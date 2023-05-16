/* eslint-disable @typescript-eslint/ban-types */
import { GraphQLScalarType, GraphQLScalarTypeConfig, print } from 'graphql';
import { createGraphQLError } from '../error.js';
import { serializeObject } from './utilities.js';

let warned = false;

function isSafeInteger(val: bigint): boolean {
  return val <= Number.MAX_SAFE_INTEGER && val >= Number.MIN_SAFE_INTEGER;
}

function serializeSafeBigInt(val: bigint): bigint | number | string {
  if ('toJSON' in BigInt.prototype) {
    return val;
  }
  if (isSafeInteger(val)) {
    return Number(val);
  }
  if (!warned) {
    warned = true;
    console.warn(
      'By default, BigInts are not serialized to JSON as numbers but instead as strings which may lead an unintegrity in your data. ' +
        'To fix this, you can use "json-bigint-patch" to enable correct serialization for BigInts.',
    );
  }
  return val.toString();
}

export const GraphQLBigIntConfig: GraphQLScalarTypeConfig<
  bigint | number,
  bigint | string | number
> = /*#__PURE__*/ {
  name: 'BigInt',
  description: 'The `BigInt` scalar type represents non-fractional signed whole numeric values.',
  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);

    let num = coercedValue;

    if (typeof coercedValue === 'object' && coercedValue != null && 'toString' in coercedValue) {
      num = BigInt(coercedValue.toString());
      if (num.toString() !== coercedValue.toString()) {
        throw createGraphQLError(`BigInt cannot represent non-integer value: ${coercedValue}`);
      }
    }

    if (typeof coercedValue === 'boolean') {
      num = BigInt(coercedValue);
    }

    if (typeof coercedValue === 'string' && coercedValue !== '') {
      num = BigInt(coercedValue);
      if (num.toString() !== coercedValue) {
        throw createGraphQLError(`BigInt cannot represent non-integer value: ${coercedValue}`);
      }
    }

    if (typeof coercedValue === 'number') {
      if (!Number.isInteger(coercedValue)) {
        throw createGraphQLError(`BigInt cannot represent non-integer value: ${coercedValue}`);
      }
      num = BigInt(coercedValue);
    }

    if (typeof num !== 'bigint') {
      throw createGraphQLError(`BigInt cannot represent non-integer value: ${coercedValue}`);
    }

    return serializeSafeBigInt(num);
  },
  parseValue(inputValue) {
    const bigint = BigInt(inputValue.toString());
    if (inputValue.toString() !== bigint.toString()) {
      throw createGraphQLError(`BigInt cannot represent value: ${inputValue}`);
    }
    return bigint;
  },
  parseLiteral(valueNode) {
    if (!('value' in valueNode)) {
      throw createGraphQLError(`BigInt cannot represent non-integer value: ${print(valueNode)}`, {
        nodes: valueNode,
      });
    }
    const strOrBooleanValue = valueNode.value;
    const bigint = BigInt(strOrBooleanValue);
    if (strOrBooleanValue.toString() !== bigint.toString()) {
      throw createGraphQLError(`BigInt cannot represent value: ${strOrBooleanValue}`);
    }
    return bigint;
  },
  extensions: {
    codegenScalarType: 'bigint',
    jsonSchema: {
      type: 'integer',
      format: 'int64',
    },
  },
};

export const GraphQLBigInt = /*#__PURE__*/ new GraphQLScalarType(GraphQLBigIntConfig);
