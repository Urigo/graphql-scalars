/* global describe, it, expect */
import { Kind } from 'graphql/language';
import GUID from '../src/resolvers/GUID';

describe(`GUID`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      expect(GUID.serialize(`38336562-3634-6431-2d39-3264302d3400`)).toEqual(
        `38336562-3634-6431-2d39-3264302d3400`,
      );
    });

    it(`parseValue`, () => {
      expect(GUID.parseValue(`38336562-3634-6431-2d39-3264302d3400`)).toEqual(
        `38336562-3634-6431-2d39-3264302d3400`,
      );
    });

    it(`parseLiteral`, () => {
      expect(
        GUID.parseLiteral(
          {
            value: `38336562-3634-6431-2d39-3264302d3400`,
            kind: Kind.STRING,
          },
          {},
        ),
      ).toEqual(`38336562-3634-6431-2d39-3264302d3400`);
    });
  });

  describe(`invalid`, () => {
    describe(`not a valid GUID`, () => {
      it(`serialize`, () => {
        expect(() => GUID.serialize(123)).toThrow(/Value is not string/);
        expect(() => GUID.serialize(`this is not a guid`)).toThrow(
          /Value is not a valid GUID/,
        );
      });

      it(`parseValue`, () => {
        expect(() => GUID.serialize(123)).toThrow(/Value is not string/);
        expect(() => GUID.parseValue(`this is not a guid`)).toThrow(
          /Value is not a valid GUID/,
        );
      });

      it(`parseLiteral`, () => {
        expect(() =>
          GUID.parseLiteral({ value: 123, kind: Kind.INT } as any, {}),
        ).toThrow(/Can only validate strings as GUIDs but got a/);

        expect(() =>
          GUID.parseLiteral(
            { value: `this is not a guid`, kind: Kind.STRING },
            {},
          ),
        ).toThrow(/Value is not a valid GUID/);
      });
    });
  });
});
