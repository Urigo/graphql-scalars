import { Kind } from 'graphql/language';
import { GraphQLSESSN } from '../../src/scalars/ssn/SE.js';

// List was taken from https://www.uc.se/developer/consumer-reports/getting-started/
// and https://skatteverket.entryscape.net/catalog/9/datasets/147
const SSNs = [
  '194907011813',
  '4907011813',
  '194006128989',
  '4006128989',
  '196512233666',
  '193303190718',
  '3303190718',
  '195207199398',
  '5207199398',
];

describe(`SSN => SE`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      for (const value of SSNs) {
        expect(GraphQLSESSN.serialize(value)).toEqual(value);
      }
    });

    it(`parseValue`, () => {
      for (const value of SSNs) {
        expect(GraphQLSESSN.parseValue(value)).toEqual(value);
      }
    });

    it(`parseLiteral`, () => {
      for (const value of SSNs) {
        expect(
          GraphQLSESSN.parseLiteral(
            {
              value,
              kind: Kind.STRING,
            },
            {},
          ),
        ).toEqual(value);
      }
    });
  });

  describe(`invalid`, () => {
    describe(`not a valid swedish personal number`, () => {
      it(`serialize`, () => {
        expect(() => GraphQLSESSN.serialize(123456789012)).toThrow(/Value is not string/);
        expect(() => GraphQLSESSN.serialize(`this is not a swedish personal number`)).toThrow(
          /Value is not a valid swedish personal number: this is not a swedish personal number/,
        );
        expect(() => GraphQLSESSN.serialize(`123456789012`)).toThrow(
          /Value is not a valid swedish personal number: 123456789012/,
        );
        expect(() => GraphQLSESSN.serialize(`194907011811`)).toThrow(
          /Value is not a valid swedish personal number: 194907011811/,
        );
        expect(() => GraphQLSESSN.serialize(`4907011811`)).toThrow(
          /Value is not a valid swedish personal number: 4907011811/,
        );
      });

      it(`parseValue`, () => {
        expect(() => GraphQLSESSN.serialize(123456789012)).toThrow(/Value is not string/);
        expect(() => GraphQLSESSN.parseValue(`this is not a swedish personal number`)).toThrow(
          /Value is not a valid/,
        );
        expect(() => GraphQLSESSN.parseValue(`123456789012`)).toThrow(
          /Value is not a valid swedish personal number: 123456789012/,
        );
        expect(() => GraphQLSESSN.serialize(`194907011811`)).toThrow(
          /Value is not a valid swedish personal number: 194907011811/,
        );
        expect(() => GraphQLSESSN.serialize(`4907011811`)).toThrow(
          /Value is not a valid swedish personal number: 4907011811/,
        );
      });

      it(`parseLiteral`, () => {
        expect(() =>
          GraphQLSESSN.parseLiteral({ value: 123456789012, kind: Kind.INT } as any, {}),
        ).toThrow(/Can only validate strings as swedish personal number but got a: IntValue/);

        expect(() =>
          GraphQLSESSN.parseLiteral({ value: `123456789012`, kind: Kind.INT } as any, {}),
        ).toThrow(/Can only validate strings as swedish personal number but got a: IntValue/);

        expect(() =>
          GraphQLSESSN.parseLiteral(
            { value: `this is not a swedish personal number`, kind: Kind.STRING },
            {},
          ),
        ).toThrow(
          /Value is not a valid swedish personal number: this is not a swedish personal number/,
        );
      });
    });
  });
});
