import { makeExecutableSchema } from '@graphql-tools/schema';
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from '../src';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { GraphQLSchema, graphql } from 'graphql';

const FOO = { bar: 'QUX' };
const fooQuery = /* GraphQL */ `
  type Query {
    foo: JSON
  }
`;
const fooResolvers = {
  Query: {
    foo: () => FOO,
  },
};

const typeDefs = mergeTypeDefs([fooQuery, ...scalarTypeDefs]);
const resolvers = mergeResolvers([fooResolvers, scalarResolvers]);

describe('Common', () => {
  it('should create a valid schema', async () => {
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    expect(schema).toBeInstanceOf(GraphQLSchema);
    const result = await graphql({
      schema,
      source: /* GraphQL */ `
        {
          foo
        }
      `,
    });
    expect(result.errors).toBeFalsy();
    expect(result.data.foo).toBe(FOO);
  });
});
