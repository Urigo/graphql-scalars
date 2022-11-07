import { GraphQLError, GraphQLScalarType, GraphQLScalarTypeConfig, Kind, ValueNode } from 'graphql';

interface Validator {
  (rtn: string): boolean;
}

const regexp = /^([a-zA-Z0-9]){5,17}$/;

const validator: Validator = rtn => regexp.test(rtn);

const validate = (account: unknown, ast?: ValueNode): string => {
  if (typeof account !== 'string') {
    throw new GraphQLError('can only parse String', {
      nodes: ast ? [ast] : undefined,
    });
  }

  if (!validator(account)) {
    throw new GraphQLError('must be alphanumeric between 5-17', {
      nodes: ast ? [ast] : undefined,
    });
  }

  return account;
};

export const GraphQLAccountNumberConfig: GraphQLScalarTypeConfig<string, string> = {
  name: 'AccountNumber',
  description:
    'Banking account number is a string of 5 to 17 alphanumeric values for ' + 'representing an generic account number',

  serialize(value: unknown) {
    return validate(value);
  },

  parseValue(value: unknown) {
    return validate(value);
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return validate(ast.value, ast);
    }

    throw new GraphQLError(`Account Number can only parse String but got '${ast.kind}'`, {
      nodes: [ast],
    });
  },
  extensions: {
    codegenScalarType: 'string',
    jsonSchema: {
      title: 'AccountNumber',
      type: 'string',
      pattern: regexp.source,
    },
  },
};

export const GraphQLAccountNumber: GraphQLScalarType = /*#__PURE__*/ new GraphQLScalarType(GraphQLAccountNumberConfig);
