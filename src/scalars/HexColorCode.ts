import { Kind, GraphQLError, GraphQLScalarType } from 'graphql';

const HEX_COLOR_CODE = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/;

const validate = (value: any) => {
  if (typeof value !== 'string') {
    throw new TypeError(`Value is not string: ${value}`);
  }

  if (!HEX_COLOR_CODE.test(value)) {
    throw new TypeError(`Value is not a valid HexColorCode: ${value}`);
  }

  return value;
};

export const GraphQLHexColorCode = /*#__PURE__*/ new GraphQLScalarType({
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
      throw new GraphQLError(
        `Can only validate strings as hex color codes but got a: ${ast.kind}`,
      );
    }

    return validate(ast.value);
  },
});
