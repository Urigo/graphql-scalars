import DateTime from './DateTime';
import NonPositiveInt from './NonPositiveInt';
import PositiveInt from './PositiveInt';
import NonNegativeIntFactory from './NonNegativeInt';
import NegativeInt from './NegativeInt';
import NonPositiveFloat from './NonPositiveFloat';
import PositiveFloat from './PositiveFloat';
import NonNegativeFloatFactory from './NonNegativeFloat';
import NegativeFloat from './NegativeFloat';
import EmailAddress from './EmailAddress';
import URL from './URL';
import PhoneNumber from './PhoneNumber';
import PostalCode from './PostalCode';
import BigIntFactory from './BigInt';
import GUID from './GUID';
import Hexadecimal from './Hexadecimal';
import HexColorCode from './HexColorCode';
import HSL from './HSL';
import HSLA from './HSLA';
import IPv4 from './IPv4';
import IPv6 from './IPv6';
import ISBN from './ISBN';
import MAC from './MAC';
import Port from './Port';
import RGB from './RGB';
import RGBA from './RGBA';
import USCurrency from './USCurrency';
import { JSON, JSONObject } from './JSON';
import IBAN from './IBAN';

const BigIntResolver = BigIntFactory('BigInt');
const LongResolver = BigIntFactory('Long');

const NonNegativeIntResolver = NonNegativeIntFactory('NonNegative');
const UnsignedIntResolver = NonNegativeIntFactory('UnsignedInt');

const NonNegativeFloatResolver = NonNegativeFloatFactory('NonNegativeFloat');
const UnsignedFloatResolver = NonNegativeFloatFactory('UnsignedFloat');

export {
    DateTime,
    NonPositiveInt,
    PositiveInt,
    NonNegativeIntResolver as NonNegativeInt,
    UnsignedIntResolver as UnsignedInt,
    NegativeInt,
    NonPositiveFloat,
    PositiveFloat,
    NonNegativeFloatResolver as NonNegativeFloat,
    UnsignedFloatResolver as UnsignedFloat,
    NegativeFloat,
    EmailAddress,
    URL,
    PhoneNumber,
    PostalCode,
    BigIntResolver as BigInt,
    LongResolver as Long,
    GUID,
    Hexadecimal,
    HexColorCode,
    HSL,
    HSLA,
    IPv4,
    IPv6,
    ISBN,
    MAC,
    Port,
    RGB,
    RGBA,
    USCurrency,
    JSON,
    JSONObject,
    IBAN
};
