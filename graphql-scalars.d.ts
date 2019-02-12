import { GraphQLScalarType } from 'graphql';

interface RegularExpressionOptions {
  errorMessage: Function;
}

declare namespace GraphqlScalars {
  const EmailAddress: GraphQLScalarType;
  const DateTime: GraphQLScalarType;
  const NonPositiveInt: GraphQLScalarType;
  const PositiveInt: GraphQLScalarType;
  const NonNegativeInt: GraphQLScalarType;
  const NegativeInt: GraphQLScalarType;
  const NonPositiveFloat: GraphQLScalarType;
  const PositiveFloat: GraphQLScalarType;
  const NonNegativeFloat: GraphQLScalarType;
  const NegativeFloat: GraphQLScalarType;
  const URL: GraphQLScalarType;
  const PhoneNumber: GraphQLScalarType;
  const PostalCode: GraphQLScalarType;

  class RegularExpression extends GraphQLScalarType {
    constructor(
      name: string,
      regex: RegExp,
      options?: RegularExpressionOptions,
    );
  }

  const DateTimeScalar: string;
  const NonPositiveIntScalar: string;
  const PositiveIntScalar: string;
  const NonNegativeIntScalar: string;
  const UnsignedIntScalar: string;
  const NegativeIntScalar: string;
  const NonPositiveFloatScalar: string;
  const PositiveFloatScalar: string;
  const NonNegativeFloatScalar: string;
  const UnsignedFloatScalar: string;
  const NegativeFloatScalar: string;
  const EmailAddressScalar: string;
  const URLScalar: string;
  const PhoneNumberScalar: string;
  const PostalCodeScalar: string;
  const RegularExpressionScalar: string;
  const OKGScalarDefinitions: string[];
}

export = GraphqlScalars;
