import { GraphQLScalarType } from 'graphql';
import * as mocks from './mocks';

import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
  GraphQLTimestamp,
  GraphQLUtcOffset,
  GraphQLISO8601Duration,
  GraphQLLocalDate,
  GraphQLLocalTime,
  GraphQLLocalEndTime,
  GraphQLEmailAddress,
  GraphQLNegativeFloat,
  GraphQLNegativeInt,
  GraphQLNonEmptyString,
  GraphQLNonNegativeFloat,
  GraphQLNonNegativeInt,
  GraphQLNonPositiveFloat,
  GraphQLNonPositiveInt,
  GraphQLPhoneNumber,
  GraphQLPositiveFloat,
  GraphQLPositiveInt,
  GraphQLPostalCode,
  GraphQLUnsignedFloat,
  GraphQLUnsignedInt,
  GraphQLURL,
  GraphQLBigInt,
  GraphQLByte,
  GraphQLLong,
  GraphQLSafeInt,
  GraphQLUUID,
  GraphQLGUID,
  GraphQLHexadecimal,
  GraphQLHexColorCode,
  GraphQLHSL,
  GraphQLHSLA,
  GraphQLIPv4,
  GraphQLIPv6,
  GraphQLISBN,
  GraphQLJWT,
  GraphQLLatitude,
  GraphQLLongitude,
  GraphQLMAC,
  GraphQLPort,
  GraphQLRGB,
  GraphQLRGBA,
  GraphQLUSCurrency,
  GraphQLCurrency,
  GraphQLJSON,
  GraphQLJSONObject,
  GraphQLIBAN,
  GraphQLObjectID,
  GraphQLVoid,
  GraphQLDID,
  GraphQLCountryCode,
} from './scalars';
import { GraphQLDuration } from './scalars/iso-date/Duration';

export {
  Date as DateTypeDefinition,
  Time as TimeTypeDefinition,
  DateTime as DateTimeTypeDefinition,
  Timestamp as TimestampTypeDefinition,
  UtcOffset as UtcOffsetTypeDefinition,
  LocalDate as LocalDateTypeDefinition,
  LocalTime as LocalTimeTypeDefinition,
  LocalEndTime as LocalEndTimeTypeDefinition,
  EmailAddress as EmailAddressTypeDefinition,
  NegativeFloat as NegativeFloatTypeDefinition,
  NegativeInt as NegativeIntTypeDefinition,
  NonEmptyString as NonEmptyStringTypeDefinition,
  NonNegativeFloat as NonNegativeFloatTypeDefinition,
  NonNegativeInt as NonNegativeIntTypeDefinition,
  NonPositiveFloat as NonPositiveFloatTypeDefinition,
  NonPositiveInt as NonPositiveIntTypeDefinition,
  PhoneNumber as PhoneNumberTypeDefinition,
  PositiveFloat as PositiveFloatTypeDefinition,
  PositiveInt as PositiveIntTypeDefinition,
  PostalCode as PostalCodeTypeDefinition,
  UnsignedFloat as UnsignedFloatTypeDefinition,
  UnsignedInt as UnsignedIntTypeDefinition,
  URL as URLTypeDefinition,
  BigInt as BigIntTypeDefinition,
  Byte as ByteTypeDefinition,
  Long as LongTypeDefinition,
  SafeInt as SafeIntDefinition,
  UUID as UUIDDefinition,
  GUID as GUIDDefinition,
  Hexadecimal as HexadecimalTypeDefinition,
  HexColorCode as HexColorCodeDefinition,
  HSL as HSLDefinition,
  HSLA as HSLADefinition,
  IPv4 as IPv4Definition,
  IPv6 as IPv6Definition,
  ISBN as ISBNDefinition,
  JWT as JWTDefinition,
  Latitude as LatitudeDefinition,
  Longitude as LongitudeDefinition,
  MAC as MACDefinition,
  Port as PortDefinition,
  RGB as RGBDefinition,
  RGBA as RGBADefinition,
  USCurrency as USCurrencyDefinition,
  Currency as CurrencyDefinition,
  JSON as JSONDefinition,
  JSONObject as JSONObjectDefinition,
  IBAN as IBANTypeDefinition,
  ObjectID as ObjectIDTypeDefinition,
  Void as VoidTypeDefinition,
  DID as DIDDefinition,
} from './typeDefs';

export { typeDefs } from './typeDefs';

export {
  GraphQLDate as DateResolver,
  GraphQLTime as TimeResolver,
  GraphQLDateTime as DateTimeResolver,
  GraphQLTimestamp as TimestampResolver,
  GraphQLUtcOffset as UtcOffsetResolver,
  GraphQLDuration as DurationResolver,
  GraphQLISO8601Duration as ISO8601DurationResolver,
  GraphQLLocalDate as LocalDateResolver,
  GraphQLLocalTime as LocalTimeResolver,
  GraphQLLocalEndTime as LocalEndTimeResolver,
  GraphQLEmailAddress as EmailAddressResolver,
  GraphQLNegativeFloat as NegativeFloatResolver,
  GraphQLNegativeInt as NegativeIntResolver,
  GraphQLNonEmptyString as NonEmptyStringResolver,
  GraphQLNonNegativeFloat as NonNegativeFloatResolver,
  GraphQLNonNegativeInt as NonNegativeIntResolver,
  GraphQLNonPositiveFloat as NonPositiveFloatResolver,
  GraphQLNonPositiveInt as NonPositiveIntResolver,
  GraphQLPhoneNumber as PhoneNumberResolver,
  GraphQLPositiveFloat as PositiveFloatResolver,
  GraphQLPositiveInt as PositiveIntResolver,
  GraphQLPostalCode as PostalCodeResolver,
  GraphQLUnsignedFloat as UnsignedFloatResolver,
  GraphQLUnsignedInt as UnsignedIntResolver,
  GraphQLURL as URLResolver,
  GraphQLBigInt as BigIntResolver,
  GraphQLByte as ByteResolver,
  GraphQLLong as LongResolver,
  GraphQLSafeInt as SafeIntResolver,
  GraphQLUUID as UUIDResolver,
  GraphQLGUID as GUIDResolver,
  GraphQLHexadecimal as HexadecimalResolver,
  GraphQLHexColorCode as HexColorCodeResolver,
  GraphQLHSL as HSLResolver,
  GraphQLHSLA as HSLAResolver,
  GraphQLIPv4 as IPv4Resolver,
  GraphQLIPv6 as IPv6Resolver,
  GraphQLISBN as ISBNResolver,
  GraphQLJWT as JWTResolver,
  GraphQLLatitude as LatitudeResolver,
  GraphQLLongitude as LongitudeResolver,
  GraphQLMAC as MACResolver,
  GraphQLPort as PortResolver,
  GraphQLRGB as RGBResolver,
  GraphQLRGBA as RGBAResolver,
  GraphQLUSCurrency as USCurrencyResolver,
  GraphQLCurrency as CurrencyResolver,
  GraphQLJSON as JSONResolver,
  GraphQLJSONObject as JSONObjectResolver,
  GraphQLIBAN as IBANResolver,
  GraphQLObjectID as ObjectIDResolver,
  GraphQLVoid as VoidResolver,
  GraphQLDID as DIDResolver,
  GraphQLCountryCode as CountryCodeResolver,
};

export const resolvers: Record<string, GraphQLScalarType> = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
  Timestamp: GraphQLTimestamp,
  UtcOffset: GraphQLUtcOffset,
  Duration: GraphQLDuration,
  ISO8601Duration: GraphQLISO8601Duration,
  LocalDate: GraphQLLocalDate,
  LocalTime: GraphQLLocalTime,
  LocalEndTime: GraphQLLocalEndTime,
  EmailAddress: GraphQLEmailAddress,
  NegativeFloat: GraphQLNegativeFloat,
  NegativeInt: GraphQLNegativeInt,
  NonEmptyString: GraphQLNonEmptyString,
  NonNegativeFloat: GraphQLNonNegativeFloat,
  NonNegativeInt: GraphQLNonNegativeInt,
  NonPositiveFloat: GraphQLNonPositiveFloat,
  NonPositiveInt: GraphQLNonPositiveInt,
  PhoneNumber: GraphQLPhoneNumber,
  PositiveFloat: GraphQLPositiveFloat,
  PositiveInt: GraphQLPositiveInt,
  PostalCode: GraphQLPostalCode,
  UnsignedFloat: GraphQLUnsignedFloat,
  UnsignedInt: GraphQLUnsignedInt,
  URL: GraphQLURL,
  BigInt: GraphQLBigInt,
  Byte: GraphQLByte,
  Long: GraphQLLong,
  SafeInt: GraphQLSafeInt,
  UUID: GraphQLUUID,
  GUID: GraphQLGUID,
  Hexadecimal: GraphQLHexadecimal,
  HexColorCode: GraphQLHexColorCode,
  HSL: GraphQLHSL,
  HSLA: GraphQLHSLA,
  IPv4: GraphQLIPv4,
  IPv6: GraphQLIPv6,
  ISBN: GraphQLISBN,
  JWT: GraphQLJWT,
  Latitude: GraphQLLatitude,
  Longitude: GraphQLLongitude,
  MAC: GraphQLMAC,
  Port: GraphQLPort,
  RGB: GraphQLRGB,
  RGBA: GraphQLRGBA,
  USCurrency: GraphQLUSCurrency,
  Currency: GraphQLCurrency,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  IBAN: GraphQLIBAN,
  ObjectID: GraphQLObjectID,
  Void: GraphQLVoid,
  DID: GraphQLDID,
  CountryCode: GraphQLCountryCode,
};

export {
  Date as DateMock,
  Time as TimeMock,
  DateTime as DateTimeMock,
  Duration as DurationMock,
  ISO8601Duration as ISO8601DurationMock,
  Timestamp as TimestampMock,
  UtcOffset as UtcOffsetMock,
  LocalDate as LocalDateMock,
  LocalTime as LocalTimeMock,
  LocalEndTime as LocalEndTimeMock,
  EmailAddress as EmailAddressMock,
  NegativeFloat as NegativeFloatMock,
  NegativeInt as NegativeIntMock,
  NonEmptyString as NonEmptyStringMock,
  NonNegativeFloat as NonNegativeFloatMock,
  NonNegativeInt as NonNegativeIntMock,
  NonPositiveFloat as NonPositiveFloatMock,
  NonPositiveInt as NonPositiveIntMock,
  PhoneNumber as PhoneNumberMock,
  PositiveFloat as PositiveFloatMock,
  PositiveInt as PositiveIntMock,
  PostalCode as PostalCodeMock,
  UnsignedFloat as UnsignedFloatMock,
  UnsignedInt as UnsignedIntMock,
  URL as URLMock,
  BigInt as BigIntMock,
  Byte as ByteMock,
  Long as LongMock,
  SafeInt as SafeIntMock,
  UUID as UUIDMock,
  GUID as GUIDMock,
  Hexadecimal as HexadecimalMock,
  HexColorCode as HexColorCodeMock,
  HSL as HSLMock,
  HSLA as HSLAMock,
  IPv4 as IPv4Mock,
  IPv6 as IPv6Mock,
  ISBN as ISBNMock,
  JWT as JWTMock,
  Latitude as LatitudeMock,
  Longitude as LongitudeMock,
  MAC as MACMock,
  Port as PortMock,
  RGB as RGBMock,
  RGBA as RGBAMock,
  USCurrency as USCurrencyMock,
  Currency as CurrencyMock,
  JSON as JSONMock,
  JSONObject as JSONObjectMock,
  IBAN as IBANMock,
  ObjectID as ObjectIDMock,
  Void as VoidMock,
  DID as DIDMock,
  CountryCode as CountryCodeMock,
} from './mocks';

export { mocks };

export {
  RegularExpression,
  RegularExpressionOptions,
  RegularExpressionErrorMessageFn,
} from './RegularExpression';

export {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
  GraphQLTimestamp,
  GraphQLUtcOffset,
  GraphQLDuration,
  GraphQLISO8601Duration,
  GraphQLLocalDate,
  GraphQLLocalTime,
  GraphQLLocalEndTime,
  GraphQLEmailAddress,
  GraphQLNegativeFloat,
  GraphQLNegativeInt,
  GraphQLNonEmptyString,
  GraphQLNonNegativeFloat,
  GraphQLNonNegativeInt,
  GraphQLNonPositiveFloat,
  GraphQLNonPositiveInt,
  GraphQLPhoneNumber,
  GraphQLPositiveFloat,
  GraphQLPositiveInt,
  GraphQLPostalCode,
  GraphQLUnsignedFloat,
  GraphQLUnsignedInt,
  GraphQLURL,
  GraphQLBigInt,
  GraphQLByte,
  GraphQLLong,
  GraphQLSafeInt,
  GraphQLUUID,
  GraphQLGUID,
  GraphQLHexadecimal,
  GraphQLHexColorCode,
  GraphQLHSL,
  GraphQLHSLA,
  GraphQLIPv4,
  GraphQLIPv6,
  GraphQLISBN,
  GraphQLJWT,
  GraphQLLatitude,
  GraphQLLongitude,
  GraphQLMAC,
  GraphQLPort,
  GraphQLRGB,
  GraphQLRGBA,
  GraphQLUSCurrency,
  GraphQLCurrency,
  GraphQLJSON,
  GraphQLJSONObject,
  GraphQLIBAN,
  GraphQLObjectID,
  GraphQLVoid,
  GraphQLDID,
  GraphQLCountryCode,
};
