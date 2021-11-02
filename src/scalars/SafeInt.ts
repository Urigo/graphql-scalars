// Based on https://github.com/stems/graphql-bigint/

import {
  GraphQLError,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  Kind,
  print,
} from 'graphql';

// eslint-disable-next-line @typescript-eslint/ban-types
function isObjectLike(value: any): value is Object {
  return typeof value === 'object' && value !== null;
}

function serializeObject(outputValue: any): any {
  if (isObjectLike(outputValue)) {
    if (typeof outputValue.valueOf === 'function') {
      const valueOfResult = outputValue.valueOf();
      if (!isObjectLike(valueOfResult)) {
        return valueOfResult;
      }
    }
    if (typeof outputValue.toJSON === 'function') {
      return outputValue.toJSON();
    }
  }
  return outputValue;
}

function serializeSafeIntValue(outputValue: any): number {
  const coercedValue = serializeObject(outputValue);

  if (typeof coercedValue === 'boolean') {
    return coercedValue ? 1 : 0;
  }

  let num = coercedValue;
  if (typeof coercedValue === 'string' && coercedValue !== '') {
    num = Number(coercedValue);
  }

  if (!Number.isSafeInteger(num)) {
    throw new GraphQLError(
      `SafeInt cannot represent non-safe-integer value: ${num}`,
    );
  }
  return num;
}

function parseSafeIntValue(inputValue: any): number {
  if (!Number.isSafeInteger(inputValue)) {
    throw new GraphQLError(
      `SafeInt cannot represent non-safe-integer value: ${inputValue}`,
    );
  }
  return inputValue;
}

const specifiedByURL =
  'https://www.ecma-international.org/ecma-262/#sec-number.issafeinteger';

export const GraphQLSafeIntConfig = {
  name: 'SafeInt',
  description:
    'The `SafeInt` scalar type represents non-fractional signed whole numeric values that are ' +
    'considered safe as defined by the ECMAScript specification.',
  specifiedByURL,
  specifiedByUrl: specifiedByURL,
  serialize: serializeSafeIntValue,
  parseValue: parseSafeIntValue,
  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `SafeInt cannot represent non-integer value: ${print(ast)}`,
        ast,
      );
    }
    const num = parseInt(ast.value, 10);
    return parseSafeIntValue(num);
  },
  extensions: {
    codegenScalarType: 'number',
  },
} as GraphQLScalarTypeConfig<number | string, number>;

export const GraphQLSafeInt = /*#__PURE__*/ new GraphQLScalarType(
  GraphQLSafeIntConfig,
);
