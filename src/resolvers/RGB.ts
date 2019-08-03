import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { assert, string } from '@hapi/joi';

const validate = (value: any) => {
    assert(value, string(), new TypeError(`Value is not string: ${value}`));
    assert(value, string().regex(/^rgb\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*\)$/),
        new TypeError(`Value is not a valid RGB color: ${value}`));
    return value;
};

export default new GraphQLScalarType({
    name: `RGB`,

    description: `A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba().`,

    serialize(value) {
        return validate(value);
    },

    parseValue(value) {
        return validate(value);
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(`Can only validate strings as RGB colors but got a: ${ast.kind}`);
        }

        return validate(ast.value);
    }
});
