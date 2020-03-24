// Based on https://github.com/stems/graphql-bigint/

import { Kind, GraphQLScalarType } from 'graphql';

export default function (name = 'BigInt') {
    return new GraphQLScalarType({
        name,
        description:
            'The `BigInt` scalar type represents non-fractional signed whole numeric values.',
        serialize: val => val.toString(),
        parseValue: BigInt,
        parseLiteral(ast) {
            if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT || ast.kind === Kind.STRING) {
                return BigInt(ast.value);
            }
            return null;
        }
    });
}
