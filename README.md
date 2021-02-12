[![scalar](https://user-images.githubusercontent.com/25294569/63675022-87723c80-c7f0-11e9-87b9-22c78c9a17e2.gif)](http://the-guild.dev)

[![npm version](https://badge.fury.io/js/graphql-scalars.svg)](https://badge.fury.io/js/graphql-scalars)
[![Discord Chat](https://img.shields.io/discord/625400653321076807)](https://discord.gg/xud7bH9)

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

In your resolver map, first import them:

```javascript
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

Then make sure they're in the root resolver map like this:

```javascript
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

NOTE: `NonNegativeFloat` and `NonNegativeInt` are also available under the aliases `UnsignedFloat`
and `UnsignedInt`, respectively.

NOTE: `BigInt` is also available under the alias `Long`.

NOTE: `UUID` is also available under the alias `GUID`.

NOTE: `Duration` is also available under the alias `ISO8601Duration`.

Alternatively, use the default import and ES6's spread operator syntax:

```javascript
import { resolvers } from 'graphql-scalars';
```

Then make sure they're in the root resolver map like this:

```javascript
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

### Date

A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the [RFC 3339](./rfc3339.txt) profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.

This scalar is a description of the date, as used for birthdays for example. It cannot represent an instant on the time-line.

**Result Coercion**

Javascript Date instances are coerced to an RFC 3339 compliant date string. Invalid Date instances raise a field error.

**Input Coercion**

When expected as an input type, only RFC 3339 compliant date strings are accepted. All other input values raise a query error indicating an incorrect type.

### Time

A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the [RFC 3339](./rfc3339.txt) profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.

This scalar is a description of a time instant such as the opening bell of the New York Stock Exchange for example. It cannot represent an exact instant on the time-line.

This scalar ignores leap seconds (thereby assuming that a minute constitutes of 59 seconds), in this respect it diverges from the RFC 3339 profile.

Where an RFC 3339 compliant time string has a time-zone other than UTC, it is shifted to UTC. For example, the time string "14:10:20+01:00" is shifted to "13:10:20Z".

**Result Coercion**

Javascript Date instances are coerced to an RFC 3339 compliant time string by extracting the UTC time part. Invalid Date instances raise a field error.

**Input Coercion**

When expected as an input type, only RFC 3339 compliant time strings are accepted. All other input values raise a query error indicating an incorrect type.

### DateTime

A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the [RFC 3339](./rfc3339.txt) profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.

This scalar is a description of an exact instant on the time-line such as the instant that a user account was created.

This scalar ignores leap seconds (thereby assuming that a minute constitutes of 59 seconds). In this respect it diverges from the RFC 3339 profile.

Where an RFC 3339 compliant date-time string has a time-zone other than UTC, it is shifted to UTC. For example, the date-time string "2016-01-01T14:10:20+01:00" is shifted to "2016-01-01T13:10:20Z".

**Result Coercion**

JavaScript Date instances and timestamps (represented as 32-bit signed integers) are coerced to RFC 3339 compliant date-time strings. Invalid Date instances raise a field error.

**Input Coercion**

When expected as an input type, only RFC 3339 compliant date-time strings are accepted. All other input values raise a query error indicating an incorrect type.

> Taken from [graphql-iso-date](https://github.com/excitement-engineer/graphql-iso-date/)

### LocalDate

A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. The value is serialized and deserialized as a string as a signal to both clients and resolvers that special care must be taken with the value when converting it to any date/time type that includes a timezone, e.g., a JavaScript `Date`.

### LocalTime

A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. The seconds and milliseconds portions are optional. Like the `LocalDate` scalar, the value is serialized and deserialized as a string as a signal to both clients and resolvers that special care must be taken with the value when converting it to any date/time type that includes a date or timezone, e.g., a JavaScript `Date`.

### LocalEndTime

A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. The seconds and milliseconds portions are optional. This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day. This is useful when using the scalar to represent the exclusive upper bound of a time block.

### Duration

A string representing a duration conforming to the ISO8601 standard,
such as: P1W1DT13H23M34S
P is the duration designator (for period) placed at the start of the duration representation.
Y is the year designator that follows the value for the number of years.
M is the month designator that follows the value for the number of months.
W is the week designator that follows the value for the number of weeks.
D is the day designator that follows the value for the number of days.
T is the time designator that precedes the time components of the representation.
H is the hour designator that follows the value for the number of hours.
M is the minute designator that follows the value for the number of minutes.
S is the second designator that follows the value for the number of seconds.

    Note the time designator, T, that precedes the time value.

    Matches moment.js, Luxon and DateFns implementations
    ,/. is valid for decimal places and +/- is a valid prefix

### Timestamp

The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch.

> Taken from [GraphQLTimestamp.js](https://gist.github.com/langpavel/b30f3d507a47713b0c6e89016e4e9eb7)

### UtcOffset

String that will have a value of format ±hh:mm. [`List of tz database time zones`](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

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
[HTML Spec](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address).

### URL

A field whose value conforms to the standard URL format as specified in
[RFC3986](https://www.ietf.org/rfc/rfc3986.txt), and it uses real JavaScript `URL` objects.

### PhoneNumber

A field whose value conforms to the standard E.164 format as specified in
[E.164 specification](https://en.wikipedia.org/wiki/E.164). Basically this is `+17895551234`.
The very powerful
[`libphonenumber` library](https://github.com/googlei18n/libphonenumber) is available to take
_that_ format, parse and display it in whatever display format you want. It can also be used to
parse user input and _get_ the E.164 format to pass _into_ a schema.

### ObjectID

A field whose value conforms to the mongodb object id format as explained in the [documentation](https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId)

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

### NonEmptyString

A field whose value can accept any string except empty ones. It will trim any additional white space before validation. This is useful for required strings that you wish to also force a value for. "" or " " are both considered invalid values.

### SafeInt

This scalar behaves just like the native `GraphQLInt` scalar, but it allows integers that require more than 32-bits. Any integer that is considered "safe" in JavaScript (i.e. ± 9,007,199,254,740,991) is considered a valid value. But if you need more than 52-bits, you should use `BigInt`.

The [GraphQL spec](https://facebook.github.io/graphql/#sec-Int) limits its Int type to 32-bits. Maybe you've seen this error before:
[Issue on graphql-js](https://github.com/graphql/graphql-js/issues/292)

> Based on [graphql-bigint](https://github.com/stems/graphql-bigint). Even though `stems`'s implementation looks like the same with `BigInt` scalar, it is different because our `BigInt` implementation uses JavaScript's native `BigInt` type while `SafeInt` implementation doesn't support more than 52-bit integers.

### BigInt

A long integer type for [graphql-js](https://github.com/graphql/graphql-js). [It uses native `BigInt` implementation of JavaScript.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

If your environment doesn't support `BigInt`, it will support 53-bit values at maximum. You can use polyfills to support 64-bit values.

```
GraphQLError: Argument "num" has invalid value 9007199254740990.
              Expected value of type ""Int"", found 9007199254740990.
```

In order to support `BigInt` in `JSON.parse` and `JSON.stringify`, it is recommended to install this npm package together with this scalar. Otherwise, JavaScript will serialize the value as string.
[json-bigint-patch](https://github.com/ardatan/json-bigint-patch)

### UUID

A field whose value is a generic [Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier).

### Hexadecimal

A field whose value is a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal).

### HexColorCode

A field whose value is a [hex color code](https://en.wikipedia.org/wiki/Web_colors).

### HSL

A field whose value is a [CSS HSL color](<https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla()>).

### IPv4

A field whose value is a [IPv4 address](https://en.wikipedia.org/wiki/IPv4).

### IPv6

A field whose value is a [IPv6 address](https://en.wikipedia.org/wiki/IPv6).

### ISBN

A field whose value is a [ISBN-10 or ISBN-13 number](https://en.wikipedia.org/wiki/International_Standard_Book_Number).

### MAC

A field whose value is a IEEE 802 48-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address).

### Port

A field whose value is a valid [TCP port](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports) within the range of 0 to 65535.

### RGB

A field whose value is a [CSS RGB color](<https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba()>).

### RGBA

A field whose value is a [CSS RGBA color](<https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba()>).

### USCurrency

A US currency string, such as \$21.25.

> Uses [graphql-currency-scalars](https://github.com/abhiaiyer91/graphql-currency-scalars)

### Currency

A field whose value is an [ISO-4217 currency](https://en.wikipedia.org/wiki/ISO_4217).

### JSON

The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).

> Based on [graphql-type-json](https://github.com/taion/graphql-type-json)

### JSONObject

The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).

> Based on [graphql-type-json](https://github.com/taion/graphql-type-json)

### Byte

The `Byte` scalar type represents byte value as specified by [NodeJS Buffer type](https://nodejs.org/api/buffer.html)

### Void

The `Void` scalar type represents no value being returned

### IBAN

Includes IBAN specifications for the following countries:

- AD - Andorra
- AE - United Arab Emirates
- AL - Albania
- AO - Angola
- AT - Austria
- AZ - Azerbaijan
- BA - Bosnia and Herzegovina
- BE - Belgium
- BF - Burkina Faso
- BG - Bulgaria
- BH - Bahrain
- BI - Burundi
- BJ - Benin
- BR - Brazil
- BY - Belarus
- CH - Switzerland
- CI - Côte d'Ivoire
- CM - Cameroon
- CR - Costa Rica
- CV - Cabo Verde
- CY - Cyprus
- DE - Germany
- DK - Denmark
- DO - Dominican Republic
- DZ - Algeria
- EE - Estonia
- ES - Spain
- FI - Finland
- FO - Faroe Islands
- FR - France
- GB - United Kingdom of Great Britain and Northern Ireland
- GE - Georgia
- GI - Gibraltar
- GL - Greenland
- GR - Greece
- GT - Guatemala
- HR - Croatia
- HU - Hungary
- IE - Ireland
- IL - Israel
- IQ - Iraq
- IR - Iran (Islamic Republic of)
- IS - Iceland
- IT - Italy
- JO - Jordan
- KW - Kuwait
- KZ - Kazakhstan
- LB - Lebanon
- LC - Saint Lucia
- LI - Liechtenstein
- LT - Lithuania
- LU - Luxembourg
- LV - Latvia
- MC - Monaco
- MD - Moldova, Republic of
- ME - Montenegro
- MG - Madagascar
- MK - North Macedonia
- ML - Mali
- MR - Mauritania
- MT - Malta
- MU - Mauritius
- MZ - Mozambique
- NL - Netherlands
- NO - Norway
- PK - Pakistan
- PL - Poland
- PS - Palestine, State of
- PT - Portugal
- QA - Qatar
- RO - Romania
- RS - Serbia
- SA - Saudi Arabia
- SC - Seychelles
- SE - Sweden
- SI - Slovenia
- SK - Slovakia
- SM - San Marino
- SN - Senegal
- ST - Sao Tome and Principe
- SV - El Salvador
- TL - Timor-Leste
- TN - Tunisia
- TR - Turkey
- UA - Ukraine
- VA - Holy See
- VG - Virgin Islands (British)
- XK - Kosovo

### IBAN

Includes IBAN specifications for the following countries:

- AD - Andorra
- AE - United Arab Emirates
- AL - Albania
- AO - Angola
- AT - Austria
- AZ - Azerbaijan
- BA - Bosnia and Herzegovina
- BE - Belgium
- BF - Burkina Faso
- BG - Bulgaria
- BH - Bahrain
- BI - Burundi
- BJ - Benin
- BR - Brazil
- BY - Belarus
- CH - Switzerland
- CI - Côte d'Ivoire
- CM - Cameroon
- CR - Costa Rica
- CV - Cabo Verde
- CY - Cyprus
- DE - Germany
- DK - Denmark
- DO - Dominican Republic
- DZ - Algeria
- EE - Estonia
- ES - Spain
- FI - Finland
- FO - Faroe Islands
- FR - France
- GB - United Kingdom of Great Britain and Northern Ireland
- GE - Georgia
- GI - Gibraltar
- GL - Greenland
- GR - Greece
- GT - Guatemala
- HR - Croatia
- HU - Hungary
- IE - Ireland
- IL - Israel
- IQ - Iraq
- IR - Iran (Islamic Republic of)
- IS - Iceland
- IT - Italy
- JO - Jordan
- KW - Kuwait
- KZ - Kazakhstan
- LB - Lebanon
- LC - Saint Lucia
- LI - Liechtenstein
- LT - Lithuania
- LU - Luxembourg
- LV - Latvia
- MC - Monaco
- MD - Moldova, Republic of
- ME - Montenegro
- MG - Madagascar
- MK - North Macedonia
- ML - Mali
- MR - Mauritania
- MT - Malta
- MU - Mauritius
- MZ - Mozambique
- NL - Netherlands
- NO - Norway
- PK - Pakistan
- PL - Poland
- PS - Palestine, State of
- PT - Portugal
- QA - Qatar
- RO - Romania
- RS - Serbia
- SA - Saudi Arabia
- SC - Seychelles
- SE - Sweden
- SI - Slovenia
- SK - Slovakia
- SM - San Marino
- SN - Senegal
- ST - Sao Tome and Principe
- SV - El Salvador
- TL - Timor-Leste
- TN - Tunisia
- TR - Turkey
- UA - Ukraine
- VA - Holy See
- VG - Virgin Islands (British)
- XK - Kosovo

### RegularExpression

A `GraphQLScalarType` object generator that takes two arguments:

- `name` - The name of your custom type
- `regex` - The regex to be used to check against any values for fields with this new type

```
const MyRegexType = new RegularExpression('MyRegexType', /^ABC$/);
```

## What's this all about?

GraphQL is a wonderful new approach to application data and API layers that's gaining momentum. If
you have not heard of it, start [here](http://graphql.org/learn/) and check out GraphQL Tools docs
[Custom scalars](https://www.graphql-tools.com/docs/scalars) also.

However, for all of GraphQL's greatness. It is missing a couple things that we have (and you might)
find very useful in defining your schemas. Namely GraphQL has a
[limited set of scalar types](http://graphql.org/learn/schema/#scalar-types) and we have found there
are some additional scalar types that are useful in being more precise in our schemas. Thankfully,
those sharp GraphQL folks provided a simple way to add new custom scalar types if needed. That's
what this package does.

**NOTE:** We don't fault the GraphQL folks for these omissions. They have kept the core small and
clean. Arguably not every project needs these additional scalar types. But _we_ have, and now _you_
can use them too if needed.

## Contributions

Contributions, issues and feature requests are very welcome. If you are using this package and fixed a bug for yourself, please consider submitting a PR!

And if this is your first time contributing to this project, please do read our [Contributor Workflow Guide](https://github.com/the-guild-org/Stack/blob/master/CONTRIBUTING.md) before you get started off.

### Code of Conduct

Help us keep GraphQL Scalars open and inclusive. Please read and follow our [Code of Conduct](https://github.com/the-guild-org/Stack/blob/master/CODE_OF_CONDUCT.md) as adopted from [Contributor Covenant](https://www.contributor-covenant.org/)

## License

Released under the [MIT license](./LICENSE).

## Thanks

This library was originally published as `@okgrow/graphql-scalars`.
It was created and maintained by the company `ok-grow`.
We, The Guild, took over the maintaince of that library [later on](https://medium.com/the-guild/the-guild-is-taking-over-maintenance-of-merge-graphql-schemas-so-lets-talk-about-graphql-schema-46246557a225).

We also like to say thank you to [@adriano-di-giovanni](https://github.com/adriano-di-giovanni) for being extremely generous and giving us the `graphql-scalars` name on npm which was previously owned by his own [library](https://github.com/adriano-di-giovanni/graphql-scalars).

And thanks to [excitement-engineer](https://github.com/excitement-engineer) for [graphql-iso-date](https://github.com/excitement-engineer/graphql-iso-date), [stems](https://github.com/stems) for [graphql-bigint](https://github.com/stems/graphql-bigint), [taion](https://github.com/taion) for [graphql-type-json](https://github.com/taion/graphql-type-json), [langpavel](https://github.com/langpavel) for [GraphQLTimestamp.js](https://gist.github.com/langpavel/b30f3d507a47713b0c6e89016e4e9eb7), [vespertilian](https://github.com/vespertilian) for Duration scalar, [maxwellsmart84](https://github.com/maxwellsmart84) for `NonEmptyString` scalar
