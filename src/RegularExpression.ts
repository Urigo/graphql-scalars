import { GraphQLError, GraphQLScalarType } from 'graphql';

export type RegularExpressionErrorMessageFn = (r: RegExp, v: any) => string;

export interface RegularExpressionOptions {
  errorMessage?: RegularExpressionErrorMessageFn;
}

export class RegularExpression extends GraphQLScalarType {
  constructor(
    name: string,
    regex: RegExp,
    options: RegularExpressionOptions = {},
  ) {
    const REGEX = /*#__PURE__*/ regex;
    const errorMessage: RegularExpressionErrorMessageFn = options.errorMessage
      ? options.errorMessage
      : (r, v) => `Value does not match the regular expression ${r}: ${v}`;
    super({
      name,

      description: `A field whose value matches the provided regular expression ${regex}.`,

      serialize(value) {
        if (!REGEX.test(value?.toString())) {
          throw new TypeError(errorMessage(regex, value));
        }

        return value;
      },

      parseValue(value) {
        if (!REGEX.test(value?.toString())) {
          throw new TypeError(errorMessage(regex, value));
        }

        return value;
      },

      parseLiteral(ast) {
        if (!('value' in ast)) {
          throw new GraphQLError(
            `Can only validate primitive values as regular expressions but got a: ${ast.kind}`,
          );
        }

        if (!REGEX.test(ast.value.toString())) {
          throw new TypeError(errorMessage(regex, ast.value));
        }

        return ast.value;
      },
    });
  }
}
