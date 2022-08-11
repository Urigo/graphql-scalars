import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind, locatedError } from 'graphql';

interface Validator {
  (rtn: string): boolean;
}

const validator: Validator = rtn => /^([a-zA-Z0-9]){5,17}$/.test(rtn);

const validate = (account: unknown): string => {
  if (typeof account !== 'string') {
    throw locatedError(new TypeError('can only parse String'), null);
  }

  if (!validator(account)) {
    throw locatedError(new TypeError('must be alphanumeric between 5-17'), null);
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
      return validate(ast.value);
    }

    throw locatedError(new TypeError(`Account Number can only parse String but got '${ast.kind}'`), ast);
  },
};

export const GraphQLAccountNumber: GraphQLScalarType = /*#__PURE__*/ new GraphQLScalarType(GraphQLAccountNumberConfig);
