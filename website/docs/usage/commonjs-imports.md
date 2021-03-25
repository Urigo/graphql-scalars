---
id: commonjs-imports
title: apollo-server-express and CommonJS imports
sidebar_label: apollo-server-express and CommonJS imports
---

### Usage with apollo-server-express and CommonJS imports

```javascript
const { ApolloServer } = require('apollo-server-express');
// Import individual scalars and resolvers
const { DateTimeResolver, DateTimeTypeDefinition } = require('graphql-scalars');

const server = new ApolloServer({
  typeDefs: [DateTimeTypeDefinition, ...yourTypeDefs],
  resolvers: [
    { DateTime: DateTimeResolver }, // <-- Notable difference here
    ...yourResolvers,
  ],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```
