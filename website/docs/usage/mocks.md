---
id: mocks
title: Using GraphQL Scalars Mocks
sidebar_label: Mocks
---

GraphQL Scalars provides mock implementations out-of-box that is compatible with [GraphQL Tools Mocking](https://www.graphql-tools.com/docs/mocking). It can be used with `ApolloServer` like below as well.

### Using mocks with GraphQL Tools

#### Import all scalars with all mocks

This example imports all scalars to the schema.
```javascript
import { addMocksToSchema } from '@graphql-tools/mock';
import { typeDefs: scalarsTypeDefs, resolvers: scalarsResolvers, mocks: scalarsMocks } from 'graphql-scalars';

const schema = makeExecutableSchema({
  typeDefs: [
    ...scalarsTypeDefs,
    // all other typeDefs
  ],
  resolvers: {
    ...scalarsResolvers,
    // all other resolvers
  },
});

const mockedSchema = addMocksToSchema({
  schema,
  mocks: {
    ...scalarsMocks,
    // other mocks
  }
});
```

#### Import individual scalars with their own mocks

```javascript
import { addMocksToSchema } from '@graphql-tools/mock';
import { DateTimeTypeDefinition, DateTimeResolver, DateTimeMock } from 'graphql-scalars';

const schema = makeExecutableSchema({
  typeDefs: [
    DateTimeTypeDefinition,
    // all other typeDefs
  ],
  resolvers: {
    DateTime: DateTimeResolver
  },
});

const mockedSchema = addMocksToSchema({
  schema,
  mocks: {
    DateTime: DateTimeMock
  }
});
```

### Using mocks with Apollo Server

```javascript
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
// import all scalars and resolvers
import { typeDefs, resolvers, mocks } from 'graphql-scalars';
// Alternatively, import individual scalars and resolvers
// import { DateTimeResolver, DateTimeTypeDefinition, DateTimeMock, ... } from "graphql-scalars"

const server = new ApolloServer({
  typeDefs: [
    // use spread syntax to add scalar definitions to your schema
    ...typeDefs,
    // DateTimeTypeDefinition,
    // ...
    // ... other type definitions ...
  ],
  resolvers: {
    // use spread syntax to add scalar resolvers to your resolver map
    ...resolvers,
    // DateTimeResolver,
    // ...
    // ... remainder of resolver map ...
  },
  mocks: {
    // use spread syntax to add scalar resolvers to your resolver map
    ...mocks,
    // DateTimeMock,
    // ...
    // ... other mocks ...
  },
});
```
