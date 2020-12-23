import { GraphQLScalarType } from 'graphql';
import { GraphQLNonNegativeFloatConfig } from './NonNegativeFloat';

const GraphQLUnsignedFloatConfig = /*#__PURE__*/ Object.assign(
  {},
  GraphQLNonNegativeFloatConfig,
  {
    name: 'UnsignedFloat',
  },
);

export const GraphQLUnsignedFloat = /*#__PURE__*/ new GraphQLScalarType(
  GraphQLUnsignedFloatConfig,
);
