/* global describe, it, expect */
import { Kind } from 'graphql/language';
import HSLA from '../src/resolvers/HSLA';

describe(`HSLA`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      expect(HSLA.serialize(`hsla(240, 100%, 50%, .05)`)).toEqual(`hsla(240, 100%, 50%, .05)`);
    });

    it(`parseValue`, () => {
      expect(HSLA.parseValue(`hsla(240, 100%, 50%, .05)`)).toEqual(`hsla(240, 100%, 50%, .05)`);
    });

    it(`parseLiteral`, () => {
      expect(
        HSLA.parseLiteral({
          value: `hsla(240, 100%, 50%, .05)`,
          kind: Kind.STRING
        }, {})
      ).toEqual(`hsla(240, 100%, 50%, .05)`);
    });
  });

  describe(`invalid`, () => {
    describe(`not a valid HSLA color`, () => {
      it(`serialize`, () => {
        expect(() => HSLA.serialize(123)).toThrow(/Value is not string/);
        expect(() => HSLA.serialize(`this is not an hsla color`)).toThrow(/Value is not a valid HSLA color/);
      });

      it(`parseValue`, () => {
        expect(() => HSLA.serialize(123)).toThrow(/Value is not string/);
        expect(() => HSLA.parseValue(`this is not an hsla color`)).toThrow(/Value is not a valid HSLA color/);
      });

      it(`parseLiteral`, () => {
        expect(() => HSLA.parseLiteral({ value: 123, kind: Kind.INT } as any, {}))
          .toThrow(/Can only validate strings as HSLA colors but got a/);

        expect(() => HSLA.parseLiteral({ value: `this is not an hsla color`, kind: Kind.STRING }, {}))
          .toThrow(/Value is not a valid HSLA color/);
      });
    });
  });
});
