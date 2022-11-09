import { Kind, GraphQLScalarType, GraphQLScalarTypeConfig, ASTNode } from 'graphql';
import { createGraphQLError } from '../error.js';

const HEX_COLOR_CODE = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/;

const validate = (value: any, ast?: ASTNode) => {
  if (typeof value !== 'string') {
    throw createGraphQLError(`Value is not string: ${value}`, ast ? { nodes: ast } : undefined);
  }

  if (!HEX_COLOR_CODE.test(value)) {
    throw createGraphQLError(`Value is not a valid HexColorCode: ${value}`, ast ? { nodes: ast } : undefined);
  }

  return value;
};

const specifiedByURL = 'https://en.wikipedia.org/wiki/Web_colors';

export const GraphQLHexColorCodeConfig = /*#__PURE__*/ {
  name: `HexColorCode`,

  description: `A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors.`,

  serialize(value) {
    return validate(value);
  },

  parseValue(value) {
    return validate(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw createGraphQLError(`Can only validate strings as hex color codes but got a: ${ast.kind}`, { nodes: ast });
    }

    return validate(ast.value, ast);
  },

  specifiedByURL,
  specifiedByUrl: specifiedByURL,
  extensions: {
    codegenScalarType: 'string',
    jsonSchema: {
      title: 'HexColorCode',
      type: 'string',
      pattern: HEX_COLOR_CODE.source,
    },
  },
} as GraphQLScalarTypeConfig<string, string>;

export const GraphQLHexColorCode: GraphQLScalarType = /*#__PURE__*/ new GraphQLScalarType(GraphQLHexColorCodeConfig);
