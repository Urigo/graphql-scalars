/* eslint-disable @typescript-eslint/ban-types */
import { GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ensureObject, parseObject } from './utils';

export const GraphQLJSONObjectConfig: GraphQLScalarTypeConfig<object, object> =
  /*#__PURE__*/ {
    name: 'JSONObject',
    description:
      'The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
    serialize: ensureObject,
    parseValue: ensureObject,
    parseLiteral: parseObject,
    specifiedByURL:
      'http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf',
    extensions: {
      codegenScalarType: 'Record<string, any>',
    },
  };

export const GraphQLJSONObject = /*#__PURE__*/ new GraphQLScalarType(
  GraphQLJSONObjectConfig,
);
