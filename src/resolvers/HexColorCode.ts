import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { assert, string } from '@hapi/joi';

const validate = (value: any) => {
    assert(value, string(), new TypeError(`Value is not string: ${value}`));
    assert(value, string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/), new TypeError(`Value is not a valid HexColorCode: ${value}`));
    return value;
};

export default new GraphQLScalarType({
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
            throw new GraphQLError(`Can only validate strings as hex color codes but got a: ${ast.kind}`);
        }

        return validate(ast.value);
    }
});
