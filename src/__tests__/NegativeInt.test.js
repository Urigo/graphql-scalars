/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { NegativeInt } from '../';

describe('NegativeInt', () => {
  describe('valid', () => {
    describe('as int', () => {
      test('serialize', () => {
        expect(NegativeInt.serialize(-123)).toBe(-123);
      });

      test('parseValue', () => {
        expect(NegativeInt.parseValue(-123)).toBe(-123);
      });

      test('parseLiteral', () => {
        expect(NegativeInt.parseLiteral({ value: -123, kind: Kind.INT })).toBe(-123);
      });
    });

    describe('as string', () => {
      test('serialize', () => {
        expect(NegativeInt.serialize('-123')).toBe(-123);
      });

      test('parseValue', () => {
        expect(NegativeInt.parseValue('-123')).toBe(-123);
      });

      test('parseLiteral', () => {
        expect(NegativeInt.parseLiteral({ value: '-123', kind: Kind.INT })).toBe(-123);
      });
    });
  });

  describe('invalid', () => {
    describe('zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(() => NegativeInt.serialize(0)).toThrow(/Value is not a negative number/);
        });

        test('parseValue', () => {
          expect(() => NegativeInt.parseValue(0)).toThrow(/Value is not a negative number/);
        });

        test('parseLiteral', () => {
          expect(() => NegativeInt.parseLiteral({ value: 0, kind: Kind.INT })).toThrow(/Value is not a negative number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => NegativeInt.serialize('0')).toThrow(/Value is not a negative number/);
        });

        test('parseValue', () => {
          expect(() => NegativeInt.parseValue('0')).toThrow(/Value is not a negative number/);
        });

        test('parseLiteral', () => {
          expect(() => NegativeInt.parseLiteral({ value: '0', kind: Kind.INT })).toThrow(/Value is not a negative number/);
        });
      });
    });

    describe('less than zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(() => NegativeInt.serialize(1)).toThrow(/Value is not a negative number/);
        });

        test('parseValue', () => {
          expect(() => NegativeInt.parseValue(1)).toThrow(/Value is not a negative number/);
        });

        test('parseLiteral', () => {
          expect(() => NegativeInt.parseLiteral({ value: 1, kind: Kind.INT })).toThrow(/Value is not a negative number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => NegativeInt.serialize('1')).toThrow(/Value is not a negative number/);
        });

        test('parseValue', () => {
          expect(() => NegativeInt.parseValue('1')).toThrow(/Value is not a negative number/);
        });

        test('parseLiteral', () => {
          expect(() => NegativeInt.parseLiteral({ value: '1', kind: Kind.INT })).toThrow(/Value is not a negative number/);
        });
      });
    });

    describe('not a number', () => {
      test('serialize', () => {
        expect(() => NegativeInt.serialize('not a number')).toThrow(/Value is not a number/);
      });

      test('parseValue', () => {
        expect(() => NegativeInt.parseValue('not a number')).toThrow(/Value is not a number/);
      });

      test('parseLiteral', () => {
        expect(() => NegativeInt.parseLiteral({ value: 'not a number', kind: Kind.STRING })).toThrow(/Can only validate integers as negative integers but got a/);
      });
    });
  });
});
