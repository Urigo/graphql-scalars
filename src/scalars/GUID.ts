import { GraphQLScalarType } from 'graphql';
import { GraphQLUUIDConfig } from './UUID.js';

export const GraphQLGUIDConfig = /*#__PURE__*/ Object.assign({}, GraphQLUUIDConfig, {
  name: 'GUID',
});

export const GraphQLGUID: GraphQLScalarType = /*#__PURE__*/ new GraphQLScalarType(GraphQLGUIDConfig);
