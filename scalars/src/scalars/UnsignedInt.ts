import { GraphQLScalarType } from 'graphql';
import { GraphQLNonNegativeIntConfig } from './NonNegativeInt';

const GraphQLUnsignedIntConfig = /*#__PURE__*/ Object.assign({}, GraphQLNonNegativeIntConfig, {
  name: 'UnsignedInt',
});

export const GraphQLUnsignedInt: GraphQLScalarType = /*#__PURE__*/ new GraphQLScalarType(GraphQLUnsignedIntConfig);
