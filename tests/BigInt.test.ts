import { GraphQLObjectType, GraphQLNonNull, GraphQLInputObjectType } from 'graphql/type/definition';
import { GraphQLSchema, graphql } from 'graphql';
import BigInt from '../src/resolvers/BigInt';

describe('BigInt', () => {

    const Query = new GraphQLObjectType({
        name: 'Query',
        fields: {
            inc: {
                type: new GraphQLNonNull(BigInt),
                args: {
                    num: { type: new GraphQLNonNull(BigInt) }
                },
                resolve: (root, args) => args.num + 1
            },
            emptyErr: {
                type: new GraphQLNonNull(BigInt),
                resolve: () => ''
            },
            typeErr: {
                type: new GraphQLNonNull(BigInt),
                resolve: () => 3.14
            }
        }
    });

    const Mutation = new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            inc: {
                type: new GraphQLNonNull(new GraphQLObjectType({
                    name: 'IncPayload',
                    fields: {
                        result: { type: new GraphQLNonNull(BigInt) }
                    }
                })),
                args: {
                    input: {
                        type: new GraphQLNonNull(new GraphQLInputObjectType({
                            name: 'IncInput',
                            fields: {
                                num: { type: new GraphQLNonNull(BigInt) }
                            }
                        }))
                    }
                },
                resolve: (root, args) => ({ result: args.input.num + 1 })
            }
        }
    });

    const schema = new GraphQLSchema({
        query: Query,
        mutation: Mutation
    });

    const validQuery = `{
        a: inc(num: 1)
        b: inc(num: 2147483646)
        c: inc(num: 2147483647)
        d: inc(num: 2147483648)
        e: inc(num: 439857257821345)
        f: inc(num: ${Number.MAX_SAFE_INTEGER - 1})
      }`;

    const invalidQuery2 = `{
        g: inc(num: ${Number.MAX_SAFE_INTEGER})
      }`;

    const invalidQuery3 = `{
        k: emptyErr
      }`;

    const invalidQuery4 = `{
        k: typeErr
      }`;

    const validMutation = `mutation test(
        $input1: IncInput!,
        $input2: IncInput!,
        $input4: IncInput!
      ) {
        a: inc(input: $input1) { result }
        b: inc(input: $input2) { result }
        d: inc(input: $input4) { result }
      }`;

    const validVariables = {
        input1: { num: 2147483646 },
        input2: { num: Number.MAX_SAFE_INTEGER - 1 },
        input4: { num: '1' }
    };

    const invalidMutation = `mutation test(
        $input3: IncInput!,
      ) {
        c: inc(input: $input3) { result }
      }`;

    const invalidVariables = {
        input3: { num: Number.MAX_SAFE_INTEGER + 1 }
    };
    it('2', async () => {
        const { data, errors } = await graphql(schema, invalidQuery2);
        expect(errors).toHaveLength(1);
        expect(errors[0].message).toEqual('BigInt cannot represent non 53-bit signed integer value: 9007199254740992');
        expect(data).toEqual(null);

    });
    it('3', async () => {
        const { data, errors } = await graphql(schema, invalidQuery3);

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toEqual('BigInt cannot represent non 53-bit signed integer value: (empty string)');
        expect(data).toEqual(null);

    });
    it('4', async () => {
        const { data, errors } = await graphql(schema, invalidQuery4);
        expect(errors).toHaveLength(1);
        expect(errors[0].message).toEqual('BigInt cannot represent non-integer value: 3.14');
        expect(data).toEqual(null);

    });
    it('5', async () => {
        const { data, errors } = await graphql(schema, validQuery);
        expect(errors).toEqual(undefined);
        expect(data).toEqual({
            a: 2,
            b: 2147483647,
            c: 2147483648,
            d: 2147483649,
            e: 439857257821346,
            f: 9007199254740991
        });
    });
    it('6', async () => {
        const { data, errors } = await graphql(schema, invalidMutation, null, null, invalidVariables);
        expect(errors).toHaveLength(1);
        expect(errors[0].message).toContain('BigInt cannot represent non 53-bit signed integer value: 9007199254740992');
        expect(data).toEqual(undefined);
    });
    it('7', async () => {
        const { data, errors } = await graphql(schema, validMutation, null, null, validVariables);
        expect(errors).toEqual(undefined);
        expect(data).toEqual({
            a: { result: 2147483647 },
            b: { result: 9007199254740991 },
            d: { result: 2 }
        });
    });
});
