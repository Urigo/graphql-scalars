import { ASTNode, GraphQLScalarType, GraphQLScalarTypeConfig, Kind } from 'graphql';
import { createGraphQLError } from '../error.js';

const CURRENCY_REGEX =
  /^(AED|AFN|ALL|AMD|ANG|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BHD|BIF|BMD|BND|BOB|BOV|BRL|BSD|BTN|BWP|BYN|BZD|CAD|CDF|CHE|CHF|CHW|CLF|CLP|CNY|COP|COU|CRC|CUC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MXV|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLL|SOS|SRD|SSP|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UYW|UZS|VES|VND|VUV|WST|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XCD|XDR|XOF|XPD|XPF|XPT|XSU|XTS|XUA|XXX|YER|ZAR|ZMW|ZWL)$/i;

const validate = (value: any, ast?: ASTNode) => {
  if (typeof value !== 'string') {
    throw createGraphQLError(`Value is not string: ${value}`, ast ? { nodes: ast } : undefined);
  }

  if (!CURRENCY_REGEX.test(value)) {
    throw createGraphQLError(
      `Value is not a valid currency value: ${value}`,
      ast ? { nodes: ast } : undefined,
    );
  }

  return value;
};

const specifiedByURL = 'https://en.wikipedia.org/wiki/ISO_4217';

export const GraphQLCurrencyConfig = /*#__PURE__*/ {
  name: `Currency`,

  description: `A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217.`,

  serialize(value) {
    return validate(value);
  },

  parseValue(value) {
    return validate(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw createGraphQLError(`Can only validate strings as a currency but got a: ${ast.kind}`, {
        nodes: ast,
      });
    }

    return validate(ast.value, ast);
  },

  specifiedByURL,
  specifiedByUrl: specifiedByURL,
  extensions: {
    codegenScalarType: 'string',
    jsonSchema: {
      title: 'Currency',
      type: 'string',
      pattern: CURRENCY_REGEX.source,
    },
  },
} as GraphQLScalarTypeConfig<string, string>;

export const GraphQLCurrency = /*#__PURE__*/ new GraphQLScalarType(GraphQLCurrencyConfig);
