/* global describe, it, expect */
import { Kind } from 'graphql/language';
import Hexadecimal from '../src/resolvers/Hexadecimal';

describe(`Hexadecimal`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      expect(Hexadecimal.serialize(`123456789AbCdEf`)).toEqual(`123456789AbCdEf`);
    });

    it(`parseValue`, () => {
      expect(Hexadecimal.parseValue(`123456789AbCdEf`)).toEqual(`123456789AbCdEf`);
    });

    it(`parseLiteral`, () => {
      expect(
        Hexadecimal.parseLiteral({
          value: `123456789AbCdEf`,
          kind: Kind.STRING
        }, {})
      ).toEqual(`123456789AbCdEf`);
    });
  });

  describe(`invalid`, () => {
    describe(`not a valid hexadecimal value`, () => {
      it(`serialize`, () => {
        expect(() => Hexadecimal.serialize(123)).toThrow(/Value is not string/);
        expect(() => Hexadecimal.serialize(`this is not a hex color code`)).toThrow(/Value is not a valid hexadecimal value/);
      });

      it(`parseValue`, () => {
        expect(() => Hexadecimal.serialize(123)).toThrow(/Value is not string/);
        expect(() => Hexadecimal.parseValue(`this is not a hex color code`)).toThrow(/Value is not a valid hexadecimal value/);
      });

      it(`parseLiteral`, () => {
        expect(() => Hexadecimal.parseLiteral({ value: 123, kind: Kind.INT } as any, {}))
          .toThrow(/Can only validate strings as a hexadecimal but got a/);

        expect(() => Hexadecimal.parseLiteral({ value: `this is not a hex color code`, kind: Kind.STRING }, {}))
          .toThrow(/Value is not a valid hexadecimal value/);
      });
    });
  });
});
