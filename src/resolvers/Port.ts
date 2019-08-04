import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { assert, any, number } from '@hapi/joi';

const validate = (value: any) => {
    assert(value, any().invalid(Infinity, -Infinity), new TypeError(`Value is not a finite number: ${value}`));
    assert(value, number().required(), new TypeError(`Value is not a number: ${value}`));
    const parsed = parseInt(value, 10);
    assert(parsed, number().port(), new TypeError(`Value is not a valid TCP port: ${parsed}`));
    return parsed;
};

export default new GraphQLScalarType({
    name: `Port`,

    description: `A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports`,

    serialize(value) {
        return validate(value);
    },

    parseValue(value) {
        return validate(value);
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.INT) {
            throw new GraphQLError(`Can only validate integers as TCP ports but got a: ${ast.kind}`);
        }

        return validate(ast.value);
    }
});
