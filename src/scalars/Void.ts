import { GraphQLScalarType } from 'graphql';

export const GraphQLVoid: GraphQLScalarType =
  /*#__PURE__*/ new GraphQLScalarType({
    name: 'Void',

    description: 'Represents NULL values',

    serialize() {
      return null;
    },

    parseValue() {
      return null;
    },

    parseLiteral() {
      return null;
    },
    extensions: {
      codegenScalarType: 'void',
    },
  });
