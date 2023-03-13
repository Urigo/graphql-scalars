/* eslint-disable @typescript-eslint/ban-types */
import { Kind, GraphQLScalarType, GraphQLScalarTypeConfig, print } from 'graphql';
import { createGraphQLError } from '../error.js';
import { serializeObject } from './utilities.js';

export const GraphQLBigIntConfig: GraphQLScalarTypeConfig<bigint, bigint | string | number> = /*#__PURE__*/ {
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
      return coercedValue ? 1 : 0;
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

    if ('toJSON' in BigInt.prototype) {
      return num;
    }

    if (Number.isSafeInteger(Number(num))) {
      return num;
    }

    return num.toString();
  },
  parseValue(inputValue) {
    const num = BigInt(inputValue.toString());
    if (inputValue.toString() !== num.toString()) {
      throw createGraphQLError(`BigInt cannot represent value: ${inputValue}`);
    }
    return num;
  },
  parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.INT) {
      throw createGraphQLError(`BigInt cannot represent non-integer value: ${print(valueNode)}`, { nodes: valueNode });
    }
    const num = BigInt(valueNode.value);
    if (num.toString() !== valueNode.value) {
      throw createGraphQLError(`BigInt cannot represent value: ${valueNode.value}`, { nodes: valueNode });
    }
    return num;
  },
  extensions: {
    codegenScalarType: 'bigint',
    jsonSchema: {
      type: 'integer',
      format: 'int64',
    },
  },
};

export const GraphQLBigInt: GraphQLScalarType = /*#__PURE__*/ new GraphQLScalarType(GraphQLBigIntConfig);
