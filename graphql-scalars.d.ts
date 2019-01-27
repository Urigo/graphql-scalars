import { GraphQLScalarType } from 'graphql';

declare namespace GraphqlScalars {
  declare const EmailAddress: GraphQLScalarType;
  declare const DateTime: GraphQLScalarType;
  declare const NonPositiveInt: GraphQLScalarType;
  declare const PositiveInt: GraphQLScalarType;
  declare const NonNegativeInt: GraphQLScalarType;
  declare const NegativeInt: GraphQLScalarType;
  declare const NonPositiveFloat: GraphQLScalarType;
  declare const PositiveFloat: GraphQLScalarType;
  declare const NonNegativeFloat: GraphQLScalarType;
  declare const NegativeFloat: GraphQLScalarType;
  declare const EmailAddress: GraphQLScalarType;
  declare const URL: GraphQLScalarType;
  declare const PhoneNumber: GraphQLScalarType;
  declare const PostalCode: GraphQLScalarType;

  declare class RegularExpression extends GraphQLScalarType {
    constructor(name: string, regex: RegExp);
  }
}

export = GraphqlScalars;
