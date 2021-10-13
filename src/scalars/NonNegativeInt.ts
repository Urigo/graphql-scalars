import {
  Kind,
  GraphQLError,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { processValue } from './utilities';

export const GraphQLNonNegativeIntConfig: GraphQLScalarTypeConfig<any, any> =
  /*#__PURE__*/ {
    name: 'NonNegativeInt',

    description: 'Integers that will have a value of 0 or more.',

    serialize(value) {
      return processValue(value, 'NonNegativeInt');
    },

    parseValue(value) {
      return processValue(value, 'NonNegativeInt');
    },

    parseLiteral(ast) {
      if (ast.kind !== Kind.INT) {
        throw new GraphQLError(
          `Can only validate integers as non-negative integers but got a: ${ast.kind}`,
        );
      }

      return processValue(ast.value, 'NonNegativeInt');
    },
    extensions: {
      codegenScalarType: 'number',
    },
  };

export const GraphQLNonNegativeInt = /*#__PURE__*/ new GraphQLScalarType(
  GraphQLNonNegativeIntConfig,
);
