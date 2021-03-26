---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
---

## Installation

To get started with GraphQL Scalars, install the packages as follows

`npm install --save graphql-scalars`

or

`yarn add graphql-scalars`

## Integration to your existing GraphQL Schema

GraphQL Scalars is easy to integrate in your existing GraphQL Schema. You need to add a scalar definition to your SDL type definitions and resolvers like below;

### In your SDL type definitions

```graphql
scalar ScalarName
```

You can also import ready-to-use type definitions for scalars like below;

```typescript
// or import specific typeDefs only with ES6 Import
import { ScalarNameTypeDefinition } from 'graphql-scalars';
// or import specific typeDefs only with CommonJS
const { ScalarNameTypeDefinition } = require('graphql-scalars');
// or import all typeDefs once with ES6 Import
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
// or import all typeDefs once with CommonJS
const { typeDefs: scalarTypeDefs } = require('graphql-scalars');

const typeDefs = [
  ...scalarTypeDefs,
  // other typeDefs
];
// or
const typeDefs = [
  ScalarNameTypeDefinition,
  // other typeDefs
];
```

### Importing it in your resolver map

You can either import the specific scalar's resolvers or all of the resolvers once.

```typescript
// or import specific resolvers only with ES6 Import
import { ScalarNameResolver } from 'graphql-scalars';
// or import specific resolvers only with CommonJS
const { ScalarNameResolver } = require('graphql-scalars');
// or import all resolvers once with ES6 Import
import { resolvers as scalarResolvers } from 'graphql-scalars';
// or import all resolvers once with CommonJS
const { resolvers: scalarResolvers } = require('graphql-scalars');
```

### Adding to the root resolver map

```typescript
const myResolverMap = {
  ScalarName: ScalarNameResolver,

  Query: {
    // more stuff here
  },

  Mutation: {
    // more stuff here
  },
};
```

### Using it in your type definitions

That's it. Now you can use these scalar types in your schema definition like this:

```typescript
type Person {
  birthDate: DateTime
  ageInYears: PositiveInt

  heightInInches: PositiveFloat

  minimumHourlyRate: NonNegativeFloat

  currentlyActiveProjects: NonNegativeInt

  email: EmailAddress
  homePage: URL

  phoneNumber: PhoneNumber
  homePostalCode: PostalCode
}
```

These scalars can be used just like the base, built-in ones.
