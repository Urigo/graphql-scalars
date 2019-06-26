import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './scalars';
import DateTime from './DateTime';
import NonPositiveInt from './NonPositiveInt';
import PositiveInt from './PositiveInt';
import NonNegativeInt from './NonNegativeInt';
import NegativeInt from './NegativeInt';
import NonPositiveFloat from './NonPositiveFloat';
import PositiveFloat from './PositiveFloat';
import NonNegativeFloat from './NonNegativeFloat';
import NegativeFloat from './NegativeFloat';
import EmailAddress from './EmailAddress';
import URL from './URL';
import PhoneNumber from './PhoneNumber';
import PostalCode from './PostalCode';
import BigInt from './BigInt';

export const ScalarsModule = new GraphQLModule({
    typeDefs,
    resolvers: {
        DateTime,
        PositiveInt,
        NonPositiveInt,
        NonNegativeInt,
        UnsignedInt: NonNegativeInt,
        NegativeInt,
        PositiveFloat,
        NonPositiveFloat,
        NonNegativeFloat,
        UnsignedFloat: NonNegativeFloat,
        NegativeFloat,
        EmailAddress,
        URL,
        PhoneNumber,
        PostalCode,
        BigInt,
        Long: BigInt,
    }
});
