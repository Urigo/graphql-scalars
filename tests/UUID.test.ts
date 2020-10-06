/* global describe, it, expect */
import { Kind } from 'graphql/language';
import { GraphQLUUID } from '../src/scalars/UUID';

describe(`UUID`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      expect(
        GraphQLUUID.serialize(`38336562-3634-6431-2d39-3264302d3400`),
      ).toEqual(`38336562-3634-6431-2d39-3264302d3400`);
    });

    it(`parseValue`, () => {
      expect(
        GraphQLUUID.parseValue(`38336562-3634-6431-2d39-3264302d3400`),
      ).toEqual(`38336562-3634-6431-2d39-3264302d3400`);
    });

    it(`parseLiteral`, () => {
      expect(
        GraphQLUUID.parseLiteral(
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
    describe(`not a valid UUID`, () => {
      it(`serialize`, () => {
        expect(() => GraphQLUUID.serialize(123)).toThrow(/Value is not string/);
        expect(() => GraphQLUUID.serialize(`this is not a uuid`)).toThrow(
          /Value is not a valid UUID/,
        );
      });

      it(`parseValue`, () => {
        expect(() => GraphQLUUID.serialize(123)).toThrow(/Value is not string/);
        expect(() => GraphQLUUID.parseValue(`this is not a uuid`)).toThrow(
          /Value is not a valid UUID/,
        );
      });

      it(`parseLiteral`, () => {
        expect(() =>
          GraphQLUUID.parseLiteral({ value: 123, kind: Kind.INT } as any, {}),
        ).toThrow(/Can only validate strings as UUIDs but got a/);

        expect(() =>
          GraphQLUUID.parseLiteral(
            { value: `this is not a uuid`, kind: Kind.STRING },
            {},
          ),
        ).toThrow(/Value is not a valid UUID/);
      });
    });
  });
});
