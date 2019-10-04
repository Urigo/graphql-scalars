// Based on https://github.com/stems/graphql-bigint/

import { GraphQLScalarType } from 'graphql/type/definition';

import { Kind } from 'graphql/language/kinds';

export default new GraphQLScalarType({
    name: 'BigInt',
    description:
        'The `BigInt` scalar type represents non-fractional signed whole numeric values.',
    serialize: BigInt,
    parseValue: BigInt,
    parseLiteral(ast) {
        if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT || ast.kind === Kind.STRING) {
            return BigInt(ast.value);
        }
        return null;
    }
});

