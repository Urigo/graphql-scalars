/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { PositiveInt } from '../';

describe('PositiveInt', () => {
  describe('valid', () => {
    describe('as int', () => {
      test('serialize', () => {
        expect(PositiveInt.serialize(123)).toBe(123);
      });

      test('parseValue', () => {
        expect(PositiveInt.parseValue(123)).toBe(123);
      });

      test('parseLiteral', () => {
        expect(PositiveInt.parseLiteral({ value: 123, kind: Kind.INT })).toBe(123);
      });
    });

    describe('as string', () => {
      test('serialize', () => {
        expect(PositiveInt.serialize('123')).toBe(123);
      });

      test('parseValue', () => {
        expect(PositiveInt.parseValue('123')).toBe(123);
      });

      test('parseLiteral', () => {
        expect(PositiveInt.parseLiteral({ value: '123', kind: Kind.INT })).toBe(123);
      });
    });
  });

  describe('invalid', () => {
    describe('zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(() => PositiveInt.serialize(0)).toThrow(/Value is not a positive number/);
        });

        test('parseValue', () => {
          expect(() => PositiveInt.parseValue(0)).toThrow(/Value is not a positive number/);
        });

        test('parseLiteral', () => {
          expect(() => PositiveInt.parseLiteral({ value: 0, kind: Kind.INT })).toThrow(/Value is not a positive number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => PositiveInt.serialize('0')).toThrow(/Value is not a positive number/);
        });

        test('parseValue', () => {
          expect(() => PositiveInt.parseValue('0')).toThrow(/Value is not a positive number/);
        });

        test('parseLiteral', () => {
          expect(() => PositiveInt.parseLiteral({ value: '0', kind: Kind.INT })).toThrow(/Value is not a positive number/);
        });
      });
    });

    describe('less than zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(() => PositiveInt.serialize(-1)).toThrow(/Value is not a positive number/);
        });

        test('parseValue', () => {
          expect(() => PositiveInt.parseValue(-1)).toThrow(/Value is not a positive number/);
        });

        test('parseLiteral', () => {
          expect(() => PositiveInt.parseLiteral({ value: -1, kind: Kind.INT })).toThrow(/Value is not a positive number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => PositiveInt.serialize('-1')).toThrow(/Value is not a positive number/);
        });

        test('parseValue', () => {
          expect(() => PositiveInt.parseValue('-1')).toThrow(/Value is not a positive number/);
        });

        test('parseLiteral', () => {
          expect(() => PositiveInt.parseLiteral({ value: '-1', kind: Kind.INT })).toThrow(/Value is not a positive number/);
        });
      });
    });

    describe('not a number', () => {
      test('serialize', () => {
        expect(() => PositiveInt.serialize('not a number')).toThrow(/Value is not a number/);
      });

      test('parseValue', () => {
        expect(() => PositiveInt.parseValue('not a number')).toThrow(/Value is not a number/);
      });

      test('parseLiteral', () => {
        expect(() => PositiveInt.parseLiteral({ value: 'not a number', kind: Kind.STRING })).toThrow(/Can only validate integers as positive integers but got a/);
      });
    });
  });
});
