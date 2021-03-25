---
id: apollo-server
title: Usage with Apollo Server
sidebar_label: Apollo Server
---

### Usage with Apollo Server

```javascript
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
// import all scalars and resolvers
import { typeDefs, resolvers } from 'graphql-scalars';
// Alternatively, import individual scalars and resolvers
// import { DateTimeResolver, DateTimeTypeDefinition, ... } from "graphql-scalars"

const server = new ApolloServer({
  schema: makeExecutableSchema({
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
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```
