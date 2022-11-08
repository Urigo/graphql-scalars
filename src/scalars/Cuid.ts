import { Kind, GraphQLError, GraphQLScalarType, GraphQLScalarTypeConfig, ValueNode } from 'graphql';

const CUID_REGEX = /^c[^\s-]{8,}$/i;

const validate = (value: any, ast?: ValueNode) => {
  if (typeof value !== 'string') {
    throw new GraphQLError(
      `Value is not string: ${value}`,
      ast
        ? {
            nodes: ast,
          }
        : undefined
    );
  }

  if (!CUID_REGEX.test(value)) {
    throw new GraphQLError(
      `Value is not a valid cuid: ${value}`,
      ast
        ? {
            nodes: ast,
          }
        : undefined
    );
  }

  return value;
};

const specifiedByURL = 'https://github.com/ericelliott/cuid#broken-down';

export const GraphQLCuidConfig = /*#__PURE__*/ {
  name: 'Cuid',

  description:
    'A field whose value conforms to the standard cuid format as specified in https://github.com/ericelliott/cuid#broken-down',

  serialize: validate,

  parseValue: validate,

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as cuids but got a: ${ast.kind}`, {
        nodes: [ast],
      });
    }

    return validate(ast.value, ast);
  },

  specifiedByURL,
  specifiedByUrl: specifiedByURL,
  extensions: {
    codegenScalarType: 'string',
    jsonSchema: {
      title: 'Cuid',
      type: 'string',
      pattern: CUID_REGEX.source,
    },
  },
} as GraphQLScalarTypeConfig<string, string>;

export const GraphQLCuid: GraphQLScalarType = /*#__PURE__*/ new GraphQLScalarType(GraphQLCuidConfig);
