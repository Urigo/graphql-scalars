export const BigInt = () => Number.MAX_SAFE_INTEGER - 1;
export const DateTime = () => new Date();
export const EmailAddress = () => 'test@test.com';
export const NegativeFloat = () => -123.45;
export const NegativeInt = () => -123;
export const NonNegativeFloat = () => 123.45;
export const NonNegativeInt = () => 123;
export const NonPositiveFloat = () => -123.45;
export const NonPositiveInt = () => -123;
export const PhoneNumber = () => '+17895551234';
export const PositiveFloat = () => 123.45;
export const PostalCode = () => '60031';
const URLMock = () => new URL('http://www.test.com/');
export {
    URLMock as URL,
    NonNegativeInt as UnsignedInt,
    NonNegativeFloat as UnsignedFloat,
    BigInt as Long,
};
