/* global describe, test, expect */

import { Kind } from 'graphql/language';
import UtcOffset from '../src/resolvers/UtcOffset';

describe('UtcOffset', () => {
  describe('valid', () => {
    test('serialize', () => {
      const sample = "+02:00";
      expect(UtcOffset.serialize(sample)).toEqual(sample);
    });

    test('parseValue', () => {
      const sample = "+05:00";
      expect(UtcOffset.parseValue(sample)).toEqual(sample);
    });

    test('parseLiteral', () => {
      const result = "-12:30";
      expect(
        UtcOffset.parseLiteral({
          value: "-12:30",
          kind: Kind.STRING,
        }, {}),
      ).toEqual(result);
    });
  });

  describe('invalid', () => {
    describe('not a valid date', () => {
      test('serialize', () => {
        expect(() => UtcOffset.serialize('this is not an utc offset')).toThrow(
          /Value is not a valid UTC Offset/,
        );
      });

      test('parseValue', () => {
        expect(() => UtcOffset.parseValue('this is not an utc offset')).toThrow(
          /Value is not a valid UTC Offset/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          UtcOffset.parseLiteral({
            value: 'this is not an utc offset',
            kind: Kind.STRING,
          }, {}),
        ).toThrow(/Value is not a valid UTC Offset/);
      });

      test('parseLiteral (Int)', () => {
        expect(() =>
          UtcOffset.parseLiteral({
            value: 'this is not an utc offset',
            kind: Kind.INT,
          }, {}),
        ).toThrow(/Can only validate strings as UTC Offset/);
      });
    });
  });
});
