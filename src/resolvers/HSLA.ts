import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { assert, string } from '@hapi/joi';

const validate = (value: any) => {
    assert(value, string(), new TypeError(`Value is not string: ${value}`));
    assert(value, string().regex(/^hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)$/),
        new TypeError(`Value is not a valid HSLA color: ${value}`));
    return value;
};

export default new GraphQLScalarType({
    name: `HSLA`,

    description: `A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla().`,

    serialize(value) {
        return validate(value);
    },

    parseValue(value) {
        return validate(value);
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(`Can only validate strings as HSLA colors but got a: ${ast.kind}`);
        }

        return validate(ast.value);
    }
});
