declare module "graphql-type-json" {
    import { GraphQLScalarType } from "graphql";
    export const GraphQLJSON: typeof GraphQLScalarType;
    export const GraphQLJSONObject: typeof GraphQLScalarType;
}