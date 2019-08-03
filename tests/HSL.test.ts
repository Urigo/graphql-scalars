/* global describe, it, expect */
import { Kind } from 'graphql/language';
import HSL from '../src/resolvers/HSL';

describe(`HSL`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      expect(HSL.serialize(`hsl(270, 60%, 70%)`)).toEqual(`hsl(270, 60%, 70%)`);
    });

    it(`parseValue`, () => {
      expect(HSL.parseValue(`hsl(270, 60%, 70%)`)).toEqual(`hsl(270, 60%, 70%)`);
    });

    it(`parseLiteral`, () => {
      expect(
        HSL.parseLiteral({
          value: `hsl(270, 60%, 70%)`,
          kind: Kind.STRING
        }, {})
      ).toEqual(`hsl(270, 60%, 70%)`);
    });
  });

  describe(`invalid`, () => {
    describe(`not a valid HSL color`, () => {
      it(`serialize`, () => {
        expect(() => HSL.serialize(123)).toThrow(/Value is not string/);
        expect(() => HSL.serialize(`this is not an hsl color`)).toThrow(/Value is not a valid HSL color/);
      });

      it(`parseValue`, () => {
        expect(() => HSL.serialize(123)).toThrow(/Value is not string/);
        expect(() => HSL.parseValue(`this is not an hsl color`)).toThrow(/Value is not a valid HSL color/);
      });

      it(`parseLiteral`, () => {
        expect(() => HSL.parseLiteral({ value: 123, kind: Kind.INT } as any, {}))
          .toThrow(/Can only validate strings as HSL colors but got a/);

        expect(() => HSL.parseLiteral({ value: `this is not an hsl color`, kind: Kind.STRING }, {}))
          .toThrow(/Value is not a valid HSL color/);
      });
    });
  });
});
