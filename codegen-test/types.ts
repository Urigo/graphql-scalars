export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: import('graphql-scalars').BigIntTSType;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: import('graphql-scalars').ByteTSType;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: import('graphql-scalars').CurrencyTSType;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: import('graphql-scalars').DateTSType;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: import('graphql-scalars').DateTimeTSType;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: import('graphql-scalars').DurationTSType;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/ */
  EmailAddress: import('graphql-scalars').EmailAddressTSType;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: `${string}-${string}-${string}-${string}-${string}`;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: string;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: string;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: `#${string}`;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: string;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: string;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4:
    | `${number}.${number}.${number}.${number}`
    | `${number}.${number}.${number}.${number}/${number}`;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: `${string}:${string}:${string}:${string}:${string}:${string}:${string}:${string}`;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: string;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: import('graphql-scalars').DurationTSType;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: Record<string, any>;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: string;
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: string;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: `${number}-${number}-${number}`;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime:
    | `${number}:${number}`
    | `${number}:${number}:${number}`
    | `${number}:${number}:${number}.${number}`;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime:
    | `${number}:${number}`
    | `${number}:${number}:${number}`
    | `${number}:${number}:${number}.${number}`;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: import('graphql-scalars').BigIntTSType;
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: string | number;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC:
    | `${string}:${string}:${string}:${string}:${string}:${string}`
    | `${string}-${string}-${string}-${string}-${string}-${string}`
    | `${string}.${string}.${string}`;
  /** Floats that will have a value less than 0. */
  NegativeFloat: number;
  /** Integers that will have a value less than 0. */
  NegativeInt: number;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: string;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: number;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: number;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: number;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: string;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: `+${number}`;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: string | number;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: number;
  /** Integers that will have a value greater than 0. */
  PositiveInt: number;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: string;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: `rgb(${number}, ${number}, ${number})`;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: `rgba(${number}, ${number}, ${number})`;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: number;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: import('graphql-scalars').TimeTSType;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: Date | string | number;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: URL | `${string}://${string}`;
  /** A currency string, such as $21.25 */
  USCurrency: string;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: `${string}-${string}-${string}-${string}-${string}`;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: number;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: number;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: `-${number}:${number}` | `+${number}:${number}`;
  /** Represents NULL values */
  Void: void;
};

export type Query = {
  __typename?: 'Query';
  bigint?: Maybe<Scalars['BigInt']>;
  byte?: Maybe<Scalars['Byte']>;
  currency?: Maybe<Scalars['Currency']>;
  date?: Maybe<Scalars['Date']>;
  datetime?: Maybe<Scalars['DateTime']>;
  duration?: Maybe<Scalars['Duration']>;
  emailaddress?: Maybe<Scalars['EmailAddress']>;
  guid?: Maybe<Scalars['GUID']>;
  hexadecimal?: Maybe<Scalars['Hexadecimal']>;
  hexcolorcode?: Maybe<Scalars['HexColorCode']>;
  hsl?: Maybe<Scalars['HSL']>;
  hsla?: Maybe<Scalars['HSLA']>;
  iban?: Maybe<Scalars['IBAN']>;
  ipv4?: Maybe<Scalars['IPv4']>;
  ipv6?: Maybe<Scalars['IPv6']>;
  isbn?: Maybe<Scalars['ISBN']>;
  iso8601duration?: Maybe<Scalars['ISO8601Duration']>;
  json?: Maybe<Scalars['JSON']>;
  jsonobject?: Maybe<Scalars['JSONObject']>;
  jwt?: Maybe<Scalars['JWT']>;
  latitude?: Maybe<Scalars['Latitude']>;
  localdate?: Maybe<Scalars['LocalDate']>;
  localendtime?: Maybe<Scalars['LocalEndTime']>;
  localtime?: Maybe<Scalars['LocalTime']>;
  long?: Maybe<Scalars['Long']>;
  longitude?: Maybe<Scalars['Longitude']>;
  mac?: Maybe<Scalars['MAC']>;
  negativefloat?: Maybe<Scalars['NegativeFloat']>;
  negativeint?: Maybe<Scalars['NegativeInt']>;
  nonemptystring?: Maybe<Scalars['NonEmptyString']>;
  nonnegativefloat?: Maybe<Scalars['NonNegativeFloat']>;
  nonnegativeint?: Maybe<Scalars['NonNegativeInt']>;
  nonpositivefloat?: Maybe<Scalars['NonPositiveFloat']>;
  nonpositiveint?: Maybe<Scalars['NonPositiveInt']>;
  objectid?: Maybe<Scalars['ObjectID']>;
  phonenumber?: Maybe<Scalars['PhoneNumber']>;
  port?: Maybe<Scalars['Port']>;
  positivefloat?: Maybe<Scalars['PositiveFloat']>;
  positiveint?: Maybe<Scalars['PositiveInt']>;
  postalcode?: Maybe<Scalars['PostalCode']>;
  rgb?: Maybe<Scalars['RGB']>;
  rgba?: Maybe<Scalars['RGBA']>;
  safeint?: Maybe<Scalars['SafeInt']>;
  time?: Maybe<Scalars['Time']>;
  timestamp?: Maybe<Scalars['Timestamp']>;
  unsignedfloat?: Maybe<Scalars['UnsignedFloat']>;
  unsignedint?: Maybe<Scalars['UnsignedInt']>;
  url?: Maybe<Scalars['URL']>;
  uscurrency?: Maybe<Scalars['USCurrency']>;
  utcoffset?: Maybe<Scalars['UtcOffset']>;
  uuid?: Maybe<Scalars['UUID']>;
  void?: Maybe<Scalars['Void']>;
};
