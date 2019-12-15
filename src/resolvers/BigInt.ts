// Based on https://github.com/stems/graphql-bigint/

import { GraphQLScalarType } from 'graphql/type/definition';

import { Kind } from 'graphql/language/kinds';

export const coerceBigInt = (value: any) => {
    if (typeof BigInt === 'undefined') {
        const numberStr = value.toString().replace('n', '');
        const number = Number(numberStr);
        if (!Number.isInteger(number)) {
            throw new Error(`${value} is not an integer!`);
        }
        return Number(number);
    }
    return BigInt(value);
};

export default function (name = 'BigInt') {
    return new GraphQLScalarType({
        name,
        description:
            'The `BigInt` scalar type represents non-fractional signed whole numeric values.',
        serialize: coerceBigInt,
        parseValue: coerceBigInt,
        parseLiteral(ast) {
            if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT || ast.kind === Kind.STRING) {
                return coerceBigInt(ast.value);
            }
            return null;
        }
    });
}
