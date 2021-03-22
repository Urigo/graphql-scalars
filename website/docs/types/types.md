---
id: types
title: Supported Types
sidebar_label: Supported Types
---

These are the types we support out of the box:

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

### JWT

A field whose value is a [JSON Web Token (JWT)](https://jwt.io/introduction).

The scalar checks only the format (_header.payload.signature_) using a regex and not the validity (signature) of the token.

### Latitude

A field whose value is a valid [decimal degrees latitude number](https://en.wikipedia.org/wiki/Latitude) (53.471).

The **input** value can be either in _decimal_ (53.471) or _sexagesimal_ (53° 21' 16") format.

The **output** value is always in _decimal_ format (53.471).

The maximum decimal degrees **precision** is **8**. See [Decimal Degrees Precision](https://en.wikipedia.org/wiki/Decimal_degrees#Precision) for more information.

_This scalar is inspired by [Geolib](https://github.com/manuelbieh/geolib)._

### Longitude

A field whose value is a valid [decimal degrees longitude number](https://en.wikipedia.org/wiki/Longitude) (53.471).

The **input** value can be either in _decimal_ (53.471) or _sexagesimal_ (53° 21' 16") format.

The **output** value is always in _decimal_ format (53.471).

The maximum decimal degrees **precision** is **8**. See [Decimal Degrees Precision](https://en.wikipedia.org/wiki/Decimal_degrees#Precision) for more information.

_This scalar is inspired by [Geolib](https://github.com/manuelbieh/geolib)._

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

### RegularExpression

A `GraphQLScalarType` object generator that takes two arguments:

- `name` - The name of your custom type
- `regex` - The regex to be used to check against any values for fields with this new type

```
const MyRegexType = new RegularExpression('MyRegexType', /^ABC$/);
```
