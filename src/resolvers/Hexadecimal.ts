import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { assert, string } from '@hapi/joi';

const validate = (value: any) => {
    assert(value, string(), new TypeError(`Value is not string: ${value}`));
    assert(value, string().hex(), new TypeError(`Value is not a valid hexadecimal value: ${value}`));
    return value;
};

export default new GraphQLScalarType({
    name: `Hexadecimal`,

    description: `A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal.`,

    serialize(value) {
        return validate(value);
    },

    parseValue(value) {
        return validate(value);
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(`Can only validate strings as a hexadecimal but got a: ${ast.kind}`);
        }

        return validate(ast.value);
    }
});
