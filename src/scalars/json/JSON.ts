// This named export is intended for users of CommonJS. Users of ES modules

import { GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { identity, parseLiteral } from './utils';

export const GraphQLJSONConfig: GraphQLScalarTypeConfig<any, any> =
  /*#__PURE__*/ {
    name: 'JSON',
    description:
      'The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
    serialize: identity,
    parseValue: identity,
    parseLiteral,
    specifiedByURL:
      'http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf',
    extensions: {
      codegenScalarType: 'any',
    },
  };

export const GraphQLJSON = /*#__PURE__*/ new GraphQLScalarType(
  GraphQLJSONConfig,
);
