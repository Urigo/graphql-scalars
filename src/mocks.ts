const BigIntMock = () => BigInt(Number.MAX_SAFE_INTEGER);
const ByteMock = () => new Uint8Array([1988, 1981, 1965, 1963, 1959, 1955]);
const DateMock = () => '2007-12-03';
export const Time = () => '10:15:30Z';
export const DateTime = () => '2007-12-03T10:15:30Z';
export const Timestamp = () => 1592577642;
export const UtcOffset = () => '+03:00';
export const EmailAddress = () => 'test@test.com';
export const NegativeFloat = () => -123.45;
export const NegativeInt = () => -123;
export const NonNegativeFloat = () => 123.45;
export const NonNegativeInt = () => 123;
export const NonPositiveFloat = () => -123.45;
export const NonPositiveInt = () => -123;
export const PhoneNumber = () => '+17895551234';
export const ObjectID = () => '5e5677d71bdc2ae76344968c';
export const PositiveFloat = () => 123.45;
export const PositiveInt = () => 123;
export const PostalCode = () => '60031';
const URLMock = () => new URL('http://www.test.com/') as any;
// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export const GUID = () => {
  // Public Domain/MIT
  let d = new Date().getTime();
  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    d += performance.now(); // use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // tslint:disable-next-line: no-bitwise
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    // tslint:disable-next-line: no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};
export const HexColorCode = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16);
export const Hexadecimal = () =>
  Math.floor(Math.random() * 16777215).toString(16);

const randomVal = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + 1) + min;
};
// https://codepen.io/meowwwls/pen/jbEJRp
export const HSL = () =>
  `hsl(${randomVal(0, 360)}, ${randomVal(30, 95)}%, ${randomVal(30, 80)}%)`;
export const HSLA = () =>
  `hsla(${randomVal(0, 360)}, ${randomVal(30, 95)}%, ${randomVal(
    30,
    80,
  )}%, ${Math.random()})`;

// https://stackoverflow.com/questions/43464519/creating-fake-ip-address-using-javascript
export const IPv4 = () =>
  Math.floor(Math.random() * 255) +
  1 +
  '.' +
  (Math.floor(Math.random() * 255) + 0) +
  '.' +
  (Math.floor(Math.random() * 255) + 0) +
  '.' +
  (Math.floor(Math.random() * 255) + 0);
export const IPv6 = () => '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
// http://jsfiddle.net/guest271314/qhbC9/
export const MAC = () =>
  'XX:XX:XX:XX:XX:XX'.replace(/X/g, () =>
    '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16)),
  );
export const Port = () => randomVal(0, 65535);
export const RGB = () =>
  `rgb(${randomVal(0, 255)}, ${randomVal(0, 255)}, ${randomVal(0, 255)})`;
export const RGBA = () =>
  `rgba(${randomVal(0, 255)}, ${randomVal(0, 255)}, ${randomVal(
    0,
    255,
  )}, ${Math.random()})`;
export const ISBN = () => `978-3-16-148410-0`;
export const USCurrency = () => 1000;
export const Currency = () => 'USD';
export const JSON = () => ({});
export const JSONObject = () => ({});
export const IBAN = () => 'NL55INGB4789170233';
export const Void = (): null => null;
export const SafeInt = () => Number.MAX_SAFE_INTEGER;

export {
  DateMock as Date,
  URLMock as URL,
  NonNegativeInt as UnsignedInt,
  NonNegativeFloat as UnsignedFloat,
  BigIntMock as Long,
  BigIntMock as BigInt,
  ByteMock as Byte,
};
