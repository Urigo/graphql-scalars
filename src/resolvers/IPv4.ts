import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { assert, string } from '@hapi/joi';

const validate = (value: any) => {
    assert(value, string(), new TypeError(`Value is not string: ${value}`));
    assert(value, string().ip({ version: `ipv4` }), new TypeError(`Value is not a valid IPv4 address: ${value}`));
    return value;
};

export default new GraphQLScalarType({
    name: `IPv4`,

    description: `A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4.`,

    serialize(value) {
        return validate(value);
    },

    parseValue(value) {
        return validate(value);
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(`Can only validate strings as IPv4 addresses but got a: ${ast.kind}`);
        }

        return validate(ast.value);
    }
});
