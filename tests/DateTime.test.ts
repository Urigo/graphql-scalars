/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { DateTime } from '../src';

describe('DateTime', () => {
  describe('valid', () => {
    test('serialize', () => {
      const now = new Date();
      expect(DateTime.serialize(now)).toEqual(now.toJSON());
    });

    test('serialize (String)', () => {
      const now = '2018-07-24T01:28:47.940Z';
      const d1 = Date.parse(now);
      const d2 = new Date();

      d2.setTime(d1);

      expect(DateTime.serialize(now)).toEqual(d2.toJSON());
    });

    test('serialize (number)', () => {
      const now = new Date();

      expect(DateTime.serialize(now.getTime())).toEqual(now.toJSON());
    });

    test('parseValue', () => {
      const now = new Date();
      expect(DateTime.parseValue(now)).toEqual(now);
    });

    test('parseLiteral', () => {
      const result = new Date(Date.UTC(2017, 0, 2, 3, 4, 5, 0));
      expect(
        DateTime.parseLiteral({
          value: '2017-01-02T03:04:05.000Z',
          kind: Kind.STRING,
        }, {}),
      ).toEqual(result);

      expect(
        DateTime.parseLiteral({
          value: result.getTime().toString(),
          kind: Kind.INT,
        }, {}),
      ).toEqual(result);
    });
  });

  describe('invalid', () => {
    describe('not a valid date', () => {
      test('serialize', () => {
        expect(() => DateTime.serialize('this is not a date')).toThrow(
          /Value is not a valid Date/,
        );
      });

      test('parseValue', () => {
        expect(() => DateTime.parseValue('this is not a date')).toThrow(
          /Value is not a valid Date/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          DateTime.parseLiteral({
            value: 'this is not a date',
            kind: Kind.STRING,
          }, {}),
        ).toThrow(/Value is not a valid Date/);
      });
    });
  });
});
