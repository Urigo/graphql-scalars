---
id: mocks-apollo-server
title: Mocks with Apollo Server
sidebar_label: Mocks with Apollo Server
---

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
