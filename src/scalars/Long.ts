import { GraphQLScalarType } from 'graphql';
import { GraphQLBigInt } from './BigInt';

export const GraphQLLong = /*#__PURE__*/ new GraphQLScalarType({
  ...GraphQLBigInt.toConfig(),
  name: 'Long',
});
