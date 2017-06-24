/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { NonNegativeInt } from '../';

describe('NonNegativeInt', () => {
  describe('valid', () => {
    describe('greater than zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(NonNegativeInt.serialize(123)).toBe(123);
        });

        test('parseValue', () => {
          expect(NonNegativeInt.parseValue(123)).toBe(123);
        });

        test('parseLiteral', () => {
          expect(NonNegativeInt.parseLiteral({ value: 123, kind: Kind.INT })).toBe(123);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(NonNegativeInt.serialize('123')).toBe(123);
        });

        test('parseValue', () => {
          expect(NonNegativeInt.parseValue('123')).toBe(123);
        });

        test('parseLiteral', () => {
          expect(NonNegativeInt.parseLiteral({ value: '123', kind: Kind.INT })).toBe(123);
        });
      });
    });

    describe('zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(NonNegativeInt.serialize(0)).toBe(0);
        });

        test('parseValue', () => {
          expect(NonNegativeInt.parseValue(0)).toBe(0);
        });

        test('parseLiteral', () => {
          expect(NonNegativeInt.parseLiteral({ value: 0, kind: Kind.INT })).toBe(0);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(NonNegativeInt.serialize('0')).toBe(0);
        });

        test('parseValue', () => {
          expect(NonNegativeInt.parseValue('0')).toBe(0);
        });

        test('parseLiteral', () => {
          expect(NonNegativeInt.parseLiteral({ value: '0', kind: Kind.INT })).toBe(0);
        });
      });
    });
  });

  describe('invalid', () => {
    describe('less than zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(() => NonNegativeInt.serialize(-1)).toThrow(/Value is a negative number/);
        });

        test('parseValue', () => {
          expect(() => NonNegativeInt.parseValue(-1)).toThrow(/Value is a negative number/);
        });

        test('parseLiteral', () => {
          expect(() => NonNegativeInt.parseLiteral({ value: -1, kind: Kind.INT })).toThrow(/Value is a negative number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => NonNegativeInt.serialize('-1')).toThrow(/Value is a negative number/);
        });

        test('parseValue', () => {
          expect(() => NonNegativeInt.parseValue('-1')).toThrow(/Value is a negative number/);
        });

        test('parseLiteral', () => {
          expect(() => NonNegativeInt.parseLiteral({ value: '-1', kind: Kind.INT })).toThrow(/Value is a negative number/);
        });
      });
    });

    describe('not a number', () => {
      test('serialize', () => {
        expect(() => NonNegativeInt.serialize('not a number')).toThrow(/Value is not a number/);
      });

      test('parseValue', () => {
        expect(() => NonNegativeInt.parseValue('not a number')).toThrow(/Value is not a number/);
      });

      test('parseLiteral', () => {
        expect(() => NonNegativeInt.parseLiteral({ value: 'not a number', kind: Kind.STRING })).toThrow(/Can only validate integers as non-negative integers but got a/);
      });
    });
  });
});
