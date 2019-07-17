# graphql-scalars

[![npm version](https://badge.fury.io/js/graphql-scalars.svg)](https://badge.fury.io/js/graphql-scalars)
[![CircleCI](https://circleci.com/gh/Urigo/graphql-scalars.svg?style=svg)](https://circleci.com/gh/Urigo/graphql-scalars)

> A library of custom GraphQL [scalar types](http://graphql.org/learn/schema/#scalar-types) for creating precise type-safe GraphQL schemas.

## Installation

```
npm install --save graphql-scalars
```

or

```
yarn add graphql-scalars
```

## Usage

To use these scalars you'll need to add them in two places, your schema and your resolvers map.

NOTE: The new `RegularExpression` scalar will be used a little differently and is explained below.

In your schema:

```graphql
scalar DateTime

scalar EmailAddress

scalar NegativeFloat

scalar NegativeInt

scalar NonNegativeFloat

scalar NonNegativeInt

scalar NonPositiveFloat

scalar NonPositiveInt

scalar PhoneNumber

scalar PositiveFloat

scalar PositiveInt

scalar PostalCode

scalar RegularExpression

scalar UnsignedFloat

scalar UnsignedInt

scalar URL
```

In your resolver map, first import them:

```javascript
import {
  DateTime,
  NonPositiveInt,
  PositiveInt,
  NonNegativeInt,
  NegativeInt,
  NonPositiveFloat,
  PositiveFloat,
  NonNegativeFloat,
  NegativeFloat,
  EmailAddress,
  URL,
  PhoneNumber,
  PostalCode,
} from 'graphql-scalars';
```

Then make sure they're in the root resolver map like this:

```javascript
const myResolverMap = {
  DateTime,

  NonPositiveInt,
  PositiveInt,
  NonNegativeInt,
  NegativeInt,

  NonPositiveFloat,
  PositiveFloat,
  NonNegativeFloat,
  NegativeFloat,

  EmailAddress,
  URL,

  PhoneNumber,
  PostalCode,

  Query: {
    // more stuff here
  },

  Mutation: {
    // more stuff here
  },
};
```

NOTE: `NonNegativeFloat` and `NonNegativeInt` are also available under the aliases `UnsignedFloat`
and `UnsignedInt`, respectively.

Alternatively, use the default import and ES6's spread operator syntax:

```javascript
import OKGGraphQLScalars from 'graphql-scalars';
```

Then make sure they're in the root resolver map like this:

```javascript
const myResolverMap = {
  ...OKGGraphQLScalars,

  Query: {
    // more stuff here
  },

  Mutation: {
    // more stuff here
  },
};
```

That's it. Now you can use these scalar types in your schema definition like this:

```graphql
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

### Usage with Apollo Server

```javascript
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
// import all scalars and resolvers
import OKGGraphQLScalars, {
  OKGScalarDefinitions,
} from 'graphql-scalars';
// Alternatively, import individual scalars and resolvers
// import { DateTime, DateTimeScalar, ... } from "graphql-scalars"

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [
      // use spread syntax to add scalar definitions to your schema
      ...OKGScalarDefinitions,
      // DateTimeScalar,
      // ...
      // ... other type definitions ...
    ],
    resolvers: {
      // use spread syntax to add scalar resolvers to your resolver map
      ...OKGGraphQLScalars,
      // DateTime,
      // ...
      // ... remainder of resolver map ...
    },
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

### Using the RegularExpression scalar

First an explanation: To create a new scalar type to the GraphQL schema language, you must create an
instance of a new `GraphQLScalarType` object that implements three general functions/methods:
`serialize`, `parseValue` and `parseLiteral` which are used at different stages of processing your
GraphQL types during queries and mutations. So creating a new scalar looks like this:

```javascript
const MyScalar = new GraphQLScalarType({
    'MyScalar',

    description: 'A description of my scalar',

    serialize(value) {
      // ...
      return value;
    },

    parseValue(value) {
      // ...
      return value;
    },

    parseLiteral(ast) {
      // ...
      return ast.value;
    }
  });
```

Given this, if we want to create a new type that is essentially the same except for one little
customizable aspect (e.g., a regular expression type that has all the same code except the regex is
different) then we need to dynamically _generate_ a new `GraphQLScalarType` object given some
parameters. That's the approach we take here.

Therefore the `RegularExpression` scalar type is really a `GraphQLScalarType` object _generator_
that takes two arguments:

- a name
- the regex you want it to use

So to create a new scalar for a given regex, you will do this:

```javascript
const MyRegexType = new RegularExpression('MyRegexType', /^ABC$/);
```

Now `MyRegexType` is your new GraphQL scalar type that will enforce a value of, in this case, "ABC".

Add your new scalar type to your resolver map:

```javascript
export default {
  MyRegexType,
};
```

And to your schema:

```graphql
scalar MyRegexType
```

That's it. Now you can use `MyRegexType` as a type in the rest of your schema.

#### RegularExpression options

There is an optional third `options` argument to the RegularExpression constructor that can be used like this:

```javascript
const options = {
  errorMessage: (regex, value) => {
    if (process.env.NODE_ENV === 'production')
      return `Value is invalid format: ${value} `;
    else
      return `Value does not match the regular expression ${regex}: ${value}`;
  },
};

const MyRegexType = new RegularExpression('MyRegexType', /^ABC$/, options);
```

## Why?

The primary purposes these scalars, really of _all_ types are to:

1.  Communicate to users of your schema exactly what they can expect or to at least _reduce_
    ambiguity in cases where that's possible. For example if you have a `Person` type in your schema
    and that type has as field like `ageInYears`, the value of that can only be null or a positive
    integer (or float, depending on how you want your schema to work). It should never be zero or
    negative.
1.  Run-time type checking. GraphQL helps to tighten up the contract between client and server. It
    does this with strong typing of the _interface_ (or _schema_). This helps us have greater
    confidence about what we're receiving from the server and what the server is receiving from the
    client.

This package adds to the base options available in GraphQL to support types that are reasonably
common in defining schemas or interfaces to data.

## The Types

### DateTime

Use real JavaScript Dates for GraphQL fields. Currently you can use a String or an Int (e.g., a
timestamp in milliseconds) to represent a date/time. This scalar makes it easy to be explicit about
the type and have a real JavaScript Date returned that the client can use _without_ doing the
inevitable parsing or conversion themselves.

### NonNegativeInt

Integers that will have a value of 0 or more. Uses [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt).

### NonPositiveInt

Integers that will have a value of 0 or less. Uses [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt).

### PositiveInt

Integers that will have a value greater than 0. Uses [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt).

### NegativeInt

Integers that will have a value less than 0. Uses [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt).

### NonNegativeFloat

Floats that will have a value of 0 or more. Uses [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat).

### NonPositiveFloat

Floats that will have a value of 0 or less. Uses [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat).

### PositiveFloat

Floats that will have a value greater than 0. Uses [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat).

### NegativeFloat

Floats that will have a value less than 0. Uses [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat).

### EmailAddress

A field whose value conforms to the standard internet email address format as specified in
[RFC822](https://www.w3.org/Protocols/rfc822/).

### URL

A field whose value conforms to the standard URL format as specified in
[RFC3986](https://www.ietf.org/rfc/rfc3986.txt).

### PhoneNumber

A field whose value conforms to the standard E.164 format as specified in
[E.164 specification](https://en.wikipedia.org/wiki/E.164). Basically this is `+17895551234`.
The very powerful
[`libphonenumber` library](https://github.com/googlei18n/libphonenumber) is available to take
_that_ format, parse and display it in whatever display format you want. It can also be used to
parse user input and _get_ the E.164 format to pass _into_ a schema.

### PostalCode

We're going to start with a limited set as suggested [here](http://www.pixelenvision.com/1708/zip-postal-code-validation-regex-php-code-for-12-countries/)
and [here](https://stackoverflow.com/questions/578406/what-is-the-ultimate-postal-code-and-zip-regex).

Which gives us the following countries:

- US - United States
- UK - United Kingdom
- DE - Germany
- CA - Canada
- FR - France
- IT - Italy
- AU - Australia
- NL - Netherlands
- ES - Spain
- DK - Denmark
- SE - Sweden
- BE - Belgium
- IN - India

This is really a practical decision of weight (of the package) vs. completeness.

In the future we might expand this list and use the more comprehensive list found [here](http://unicode.org/cldr/trac/browser/tags/release-26-0-1/common/supplemental/postalCodeData.xml).

### RegularExpression

A `GraphQLScalarType` object generator that takes two arguments:

- `name` - The name of your custom type
- `regex` - The regex to be used to check against any values for fields with this new type

```
const MyRegexType = new RegularExpression('MyRegexType', /^ABC$/);
```

## What's this all about?

GraphQL is a wonderful new approach to application data and API layers that's gaining momentum. If
you have not heard of it, start [here](http://graphql.org/learn/) and check out
[Apollo](http://dev.apollodata.com/) also.

However, for all of GraphQL's greatness. It is missing a couple things that we have (and you might)
find very useful in defining your schemas. Namely GraphQL has a
[limited set of scalar types](http://graphql.org/learn/schema/#scalar-types) and we have found there
are some additional scalar types that are useful in being more precise in our schemas. Thankfully,
those sharp GraphQL folks provided a simple way to add new custom scalar types if needed. That's
what this package does.

**NOTE:** We don't fault the GraphQL folks for these omissions. They have kept the core small and
clean. Arguably not every project needs these additional scalar types. But _we_ have, and now _you_
can use them too if needed.

## License

Released under the [MIT license](https://github.com/okgrow/analytics/blob/master/License.md).

## Contributing

Issues and Pull Requests are always welcome.

Please read our [contribution guidelines](https://okgrow.github.io/guides/docs/open-source-contributing.html).

## Thanks

This library was originally published as `@okgrow/graphql-scalars`.
It was created and maintained by the company `ok-grow`.
We, The Guild, took over the maintaince of that library [later on](https://medium.com/the-guild/the-guild-is-taking-over-maintenance-of-merge-graphql-schemas-so-lets-talk-about-graphql-schema-46246557a225).

We also like to say thank you to [@adriano-di-giovanni](https://github.com/adriano-di-giovanni) for being extremely generous and giving us the `graphql-scalars` name on npm which was previously owned by his own [library](https://github.com/adriano-di-giovanni/graphql-scalars).
