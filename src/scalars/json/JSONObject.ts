import { GraphQLScalarType } from 'graphql';
import { ensureObject, parseObject } from './utils';

export const GraphQLJSONObject = /*#__PURE__*/ new GraphQLScalarType({
  name: 'JSONObject',
  description:
    'The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
  serialize: ensureObject,
  parseValue: ensureObject,
  parseLiteral: parseObject,
});
