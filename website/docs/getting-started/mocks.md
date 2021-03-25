---
id: usage
title: Usage
sidebar_label: 3. Usage
---

To use these scalars you'll need to add them in two places, your schema and your resolvers map.

NOTE: The new RegularExpression scalar will be used a little differently and is explained below.

### In your schema

```graphql
scalar Date

scalar Time

scalar DateTime

scalar Duration

scalar UtcOffset

scalar LocalDate

scalar LocalTime

scalar LocalEndTime

scalar EmailAddress

scalar NegativeFloat

scalar NegativeInt

scalar NonEmptyString

scalar NonNegativeFloat

scalar NonNegativeInt

scalar NonPositiveFloat

scalar NonPositiveInt

scalar PhoneNumber

scalar PositiveFloat

scalar PositiveInt

scalar PostalCode

scalar UnsignedFloat

scalar UnsignedInt

scalar URL

scalar ObjectID

scalar BigInt

scalar Long

scalar SafeInt

scalar UUID

scalar GUID

scalar HexColorCode

scalar HSL

scalar HSLA

scalar IPv4

scalar IPv6

scalar ISBN

scalar JWT

scalar Latitude

scalar Longitude

scalar MAC

scalar Port

scalar RGB

scalar RGBA

scalar USCurrency

scalar Currency

scalar JSON

scalar JSONObject

scalar Byte

scalar Void
```

### Importing it in your resolver map

```typescript
import {
  DateResolver,
  TimeResolver,
  DateTimeResolver,
  DurationResolver,
  UtcOffsetResolver,
  LocalDateResolver,
  LocalTimeResolver,
  LocalEndTimeResolver,
  EmailAddressResolver,
  NegativeFloatResolver,
  NegativeIntResolver,
  NonEmptyStringResolver,
  NonNegativeFloatResolver,
  NonNegativeIntResolver,
  NonPositiveFloatResolver,
  NonPositiveIntResolver,
  PhoneNumberResolver,
  PositiveFloatResolver,
  PositiveIntResolver,
  PostalCodeResolver,
  UnsignedFloatResolver,
  UnsignedIntResolver,
  URLResolver,
  BigIntResolver,
  LongResolver,
  SafeIntResolver,
  UUIDResolver,
  GUIDResolver,
  HexColorCodeResolver,
  HSLResolver,
  HSLAResolver,
  IPv4Resolver,
  IPv6Resolver,
  ISBNResolver,
  JWTResolver,
  LatitudeResolver,
  LongitudeResolver,
  MACResolver,
  PortResolver,
  RGBResolver,
  RGBAResolver,
  USCurrencyResolver,
  CurrencyResolver,
  JSONResolver,
  JSONObjectResolver,
  ObjectIDResolver,
  ByteResolver,
  VoidResolver,
} from 'graphql-scalars';
```

### Adding to the root resolver map

```typescript
const myResolverMap = {
  ObjectID: ObjectIDResolver,

  Date: DateResolver,
  Time: TimeResolver,
  DateTime: DateTimeResolver,
  Duration: DurationResolver,
  UtcOffset: UtcOffsetResolver,
  LocalDate: LocalDateResolver,
  LocalTime: LocalTimeResolver,
  LocalEndTime: LocalEndTimeResolver,

  NonPositiveInt: NonPositiveIntResolver,
  PositiveInt: PositiveIntResolver,
  NonNegativeInt: NonNegativeIntResolver,
  NegativeInt: NegativeIntResolver,
  NonPositiveFloat: NonPositiveFloatResolver,
  PositiveFloat: PositiveFloatResolver,
  NonNegativeFloat: NonNegativeFloatResolver,
  NegativeFloat: NegativeFloatResolver,
  UnsignedFloat: UnsignedFloatResolver,
  UnsignedInt: UnsignedIntResolver,
  BigInt: BigIntResolver,
  Long: LongResolver,
  SafeInt: SafeIntResolver,

  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
  PhoneNumber: PhoneNumberResolver,
  PostalCode: PostalCodeResolver,
  NonEmptyString: NonEmptyStringResolver,

  UUID: UUIDResolver,
  GUID: GUIDResolver,

  HexColorCode: HexColorCodeResolver,
  HSL: HSLResolver,
  HSLA: HSLAResolver,
  RGB: RGBResolver,
  RGBA: RGBAResolver,

  IPv4: IPv4Resolver,
  IPv6: IPv6Resolver,
  MAC: MACResolver,
  Port: PortResolver,

  ISBN: ISBNResolver,

  JWT: JWTResolver,

  Latitude: LatitudeResolver,
  Longitude: LongitudeResolver,

  USCurrency: USCurrencyResolver,
  Currency: CurrencyResolver,
  JSON: JSONResolver,
  JSONObject: JSONObjectResolver,
  Byte: ByteResolver,

  Query: {
    // more stuff here
  },

  Mutation: {
    // more stuff here
  },
};
```

### NOTE

- NonNegativeFloat and NonNegativeInt are also available under the aliases UnsignedFloat and UnsignedInt, respectively.
- BigInt is also available under the alias Long.
- UUID is also available under the alias GUID.
- Duration is also available under the alias ISO8601Duration.

Alternatively, use the default import and ES6's spread operator syntax:

`import { resolvers } from 'graphql-scalars';`

Then make sure they're in the root resolver map like this:

```typescript
const myResolverMap = {
  ...resolvers,

  Query: {
    // more stuff here
  },

  Mutation: {
    // more stuff here
  },
};
```

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
