/* global describe, it, expect */
import { Kind } from 'graphql/language';
import HexColorCode from '../src/resolvers/HexColorCode';

describe(`HexColorCode`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      expect(HexColorCode.serialize(`#BadA55`)).toEqual(`#BadA55`);
    });

    it(`parseValue`, () => {
      expect(HexColorCode.parseValue(`#BadA55`)).toEqual(`#BadA55`);
    });

    it(`parseLiteral`, () => {
      expect(
        HexColorCode.parseLiteral({
          value: `#BadA55`,
          kind: Kind.STRING
        }, {})
      ).toEqual(`#BadA55`);
    });
  });

  describe(`invalid`, () => {
    describe(`not a valid HexColorCode`, () => {
      it(`serialize`, () => {
        expect(() => HexColorCode.serialize(123)).toThrow(/Value is not string/);
        expect(() => HexColorCode.serialize(`this is not a hex color code`)).toThrow(/Value is not a valid HexColorCode/);
      });

      it(`parseValue`, () => {
        expect(() => HexColorCode.serialize(123)).toThrow(/Value is not string/);
        expect(() => HexColorCode.parseValue(`this is not a hex color code`)).toThrow(/Value is not a valid HexColorCode/);
      });

      it(`parseLiteral`, () => {
        expect(() => HexColorCode.parseLiteral({ value: 123, kind: Kind.INT } as any, {}))
          .toThrow(/Can only validate strings as hex color codes but got a/);

        expect(() => HexColorCode.parseLiteral({ value: `this is not a hex color code`, kind: Kind.STRING }, {}))
          .toThrow(/Value is not a valid HexColorCode/);
      });
    });
  });
});
