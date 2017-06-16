# @okgrow/graphql-scalars

GraphQL is a wonderful new approach to application data and API layers that's gaining momentum. If
you'v not heard of it, start [here](http://graphql.org/learn/) and check out
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


## Installation
```
npm install --save @okgrow/graphql-scalars
```


## Usage
To use these scalars you'll need to add them in two places, your schema and your resolvers map.

In your schema:
```graphql
scalar URL
scalar DateTime
scalar PositiveInt
scalar EmailAddress
scalar PositiveFloat
scalar NonNegativeInt
scalar NonNegativeFloat
```

In your resolver map, first import them:
```js
import {
  URL,
  DateTime,
  PositiveInt,
  EmailAddress,
  PositiveFloat,
  NonNegativeInt,
  NonNegativeFloat,
} from '@okgrow/graphql-scalars';
```

Then make sure they're in the root resolver map like this:

```js
const myResolverMap = {
  URL,
  DateTime,
  PositiveInt,
  EmailAddress,
  PositiveFloat,
  NonNegativeInt,
  NonNegativeFloat,

  Query: {
    ...
  },

  Mutation: {
    ...
  },
}
```

Alternatively, use the default import and ES6's (QUESTION: is this ES7?) object spread syntax:
```js
import OKGGraphQLScalars from '@okgrow/graphql-scalars';
```

Then make sure they're in the root resolver map like this:

```js
const myResolverMap = {
  ...OKGGraphQLScalars,

  Query: {
    ...
  },

  Mutation: {
    ...
  },
}
```


That's it. Now you can use these scalar types in your schema definition like this:
```graphql
type Person {
  email: EmailAddress
  homePage: URL
  birthDate: DateTime
  ageInYears: PositiveInt
  heightInInches: PositiveFloat
  minimumHourlyRate: NonNegativeFloat
  currentlyActiveProjects: NonNegativeInt
}
```

These scalars can be used just like the base, built-in ones.


## Why?
The primary purposes these scalars, really of _all_ types are to:

1. Communicate to users of your schema exactly what they can expect or to at least _reduce_
ambiguity in cases where that's possible. For example if you have a `Person` type in your schema
and that type has as field like `ageInYears`, the value of that can only be null or a positive
integer (or float, depending on how you want your schema to work). It should never be zero or
negative.
1. Run-time type checking. GraphQL helps to tighten up the contract between client and server. It
does this with strong typing of the _interface_ (or _schema_). This helps us have greater
confidence about what we're receiving from the server and what the server is receiving from the
client.

This package adds to the base options available in GraphQL to support types that are reasonably
common in defining schemas or interfaces to data.


## The Types

### URL
A field whose value conforms to the standard URL format as specified in
[RFC3986](https://www.ietf.org/rfc/rfc3986.txt).

### DateTime
Use real JavaScript Dates for GraphQL fields. Currently you can use a String or an Int (e.g., a
timestamp in milliseconds) to represent a date/time. This scalar makes it easy to be explicit about
the type and have a real JavaScript Date returned that the client can use _without_ doing the
inevitable parsing or conversion themselves.

### EmailAddress
A field whose value conforms to the standard internet email address format as specified in
[RFC822](https://www.w3.org/Protocols/rfc822/).

### PositiveInt
Integers that will have a value greater than 0.

### PositiveFloat
Floats that will have a value greater than 0.

### NonNegativeInt
Integers that will have a value of 0 or more.

### NonNegativeFloat
Floats that will have a value of 0 or more.


## Future
We'd like to keep growing this package, within reason, to include the scalar types that are widely
required when defining GraphQL schemas. We welcome both suggestions and pull requests. A couple of
ideas we're considering are:

- NegativeInt
- NegativeFloat

These are easy to add, we just haven't run into cases for them yet.

- PhoneNumber
- PostalCode

These both have challenges in terms of making them globally useful so they need a bit of thought.

For `PhoneNumber` we can probably just use the [E.164 specification](https://en.wikipedia.org/wiki/E.164)
which is simply `+17895551234`. The very powerful
[`libphonenumber` library](https://github.com/googlei18n/libphonenumber) is available to take
_that_ format, parse and display it in whatever display format you want. It can also be used to
parse user input and _get_ the E.164 format to pass _into_ a schema.

Postal codes are [a bit more involved](https://en.wikipedia.org/wiki/List_of_postal_codes). But,
again, it's probably just a really long regex.


## License
Released under the [MIT license](https://github.com/okgrow/analytics/blob/master/License.md).


## Contributing
Issues and Pull Requests are always welcome.
Please read our [contribution guidelines](https://github.com/okgrow/guides/blob/master/contributing.md).
