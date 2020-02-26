/* global describe, it, expect */
import { Kind } from 'graphql/language';
import GUID from '../src/resolvers/GUID';

describe(`GUID`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      expect(GUID.serialize(`123e4567-e89b-12d3-a456-426655440000`)).toEqual(`123e4567-e89b-12d3-a456-426655440000`);
    });

    it(`parseValue`, () => {
      expect(GUID.parseValue(`123e4567-e89b-12d3-a456-426655440000`)).toEqual(`123e4567-e89b-12d3-a456-426655440000`);
    });

    it(`parseLiteral`, () => {
      expect(
        GUID.parseLiteral({
          value: `123e4567-e89b-12d3-a456-426655440000`,
          kind: Kind.STRING
        }, {})
      ).toEqual(`123e4567-e89b-12d3-a456-426655440000`);
    });
  });

  describe(`invalid`, () => {
    describe(`not a valid GUID`, () => {
      it(`serialize`, () => {
        expect(() => GUID.serialize(123)).toThrow(/Value is not string/);
        expect(() => GUID.serialize(`this is not a guid`)).toThrow(/Value is not a valid GUID/);
      });

      it(`parseValue`, () => {
        expect(() => GUID.serialize(123)).toThrow(/Value is not string/);
        expect(() => GUID.parseValue(`this is not a guid`)).toThrow(/Value is not a valid GUID/);
      });

      it(`parseLiteral`, () => {
        expect(() => GUID.parseLiteral({ value: 123, kind: Kind.INT } as any, {}))
          .toThrow(/Can only validate strings as GUIDs but got a/);

        expect(() => GUID.parseLiteral({ value: `this is not a guid`, kind: Kind.STRING }, {}))
          .toThrow(/Value is not a valid GUID/);
      });
    });
  });
});
