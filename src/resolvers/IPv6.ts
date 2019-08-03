import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { assert, string } from '@hapi/joi';

const validate = (value: any) => {
    assert(value, string(), new TypeError(`Value is not string: ${value}`));
    assert(value, string().ip({ version: `ipv6` }), new TypeError(`Value is not a valid IPv6 address: ${value}`));
    return value;
};

export default new GraphQLScalarType({
    name: `IPv6`,

    description: `A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6.`,

    serialize(value) {
        return validate(value);
    },

    parseValue(value) {
        return validate(value);
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(`Can only validate strings as IPv6 addresses but got a: ${ast.kind}`);
        }

        return validate(ast.value);
    }
});
