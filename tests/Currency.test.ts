/* global describe, it, expect */
import { Kind } from 'graphql/language';
import Currency from '../src/resolvers/Currency';

describe(`Currency`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      expect(Currency.serialize(`USD`)).toEqual(`USD`);
    });

    it(`parseValue`, () => {
      expect(Currency.parseValue(`USD`)).toEqual(`USD`);
    });

    it(`parseLiteral`, () => {
      expect(
        Currency.parseLiteral(
          {
            value: `USD`,
            kind: Kind.STRING,
          },
          {},
        ),
      ).toEqual(`USD`);
    });
  });

  describe(`invalid`, () => {
    describe(`not a valid currency value`, () => {
      it(`serialize`, () => {
        expect(() => Currency.serialize(123)).toThrow(/Value is not string/);
        expect(() => Currency.serialize(`this is not a currency`)).toThrow(
          /Value is not a valid currency value/,
        );
      });

      it(`parseValue`, () => {
        expect(() => Currency.serialize(123)).toThrow(/Value is not string/);
        expect(() => Currency.parseValue(`this is not a currency`)).toThrow(
          /Value is not a valid currency value/,
        );
      });

      it(`parseLiteral`, () => {
        expect(() =>
          Currency.parseLiteral({ value: 123, kind: Kind.INT } as any, {}),
        ).toThrow(/Can only validate strings as a currency but got a/);

        expect(() =>
          Currency.parseLiteral(
            { value: `this is not a currency`, kind: Kind.STRING },
            {},
          ),
        ).toThrow(/Value is not a valid currency value/);
      });
    });
  });
});
