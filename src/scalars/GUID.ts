import { GraphQLScalarType } from 'graphql';
import { GraphQLUUIDConfig } from './UUID';

const GraphQLGUIDConfig = /*#__PURE__*/ Object.assign({}, GraphQLUUIDConfig, {
  name: 'UUID',
});

export const GraphQLGUID = /*#__PURE__*/ new GraphQLScalarType(
  GraphQLGUIDConfig,
);
