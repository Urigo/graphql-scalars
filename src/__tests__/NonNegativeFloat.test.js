/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { NonNegativeFloat } from '../';

describe('NonNegativeFloat', () => {
  describe('valid', () => {
    describe('greater than zero', () => {
      describe('as float', () => {
        test('serialize', () => {
          expect(NonNegativeFloat.serialize(123.45)).toBe(123.45);
        });

        test('parseValue', () => {
          expect(NonNegativeFloat.parseValue(123.45)).toBe(123.45);
        });

        test('parseLiteral', () => {
          expect(NonNegativeFloat.parseLiteral({ value: 123.45, kind: Kind.FLOAT })).toBe(123.45);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(NonNegativeFloat.serialize('123.45')).toBe(123.45);
        });

        test('parseValue', () => {
          expect(NonNegativeFloat.parseValue('123.45')).toBe(123.45);
        });

        test('parseLiteral', () => {
          expect(NonNegativeFloat.parseLiteral({ value: '123.45', kind: Kind.FLOAT })).toBe(123.45);
        });
      });
    });

    describe('zero', () => {
      describe('as float', () => {
        test('serialize', () => {
          expect(NonNegativeFloat.serialize(0.0)).toBe(0.0);
        });

        test('parseValue', () => {
          expect(NonNegativeFloat.parseValue(0.0)).toBe(0.0);
        });

        test('parseLiteral', () => {
          expect(NonNegativeFloat.parseLiteral({ value: 0.0, kind: Kind.FLOAT })).toBe(0.0);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(NonNegativeFloat.serialize('0.0')).toBe(0.0);
        });

        test('parseValue', () => {
          expect(NonNegativeFloat.parseValue('0.0')).toBe(0.0);
        });

        test('parseLiteral', () => {
          expect(NonNegativeFloat.parseLiteral({ value: '0.0', kind: Kind.FLOAT })).toBe(0.0);
        });
      });
    });
  });

  describe('invalid', () => {
    describe('less than zero', () => {
      describe('as float', () => {
        test('serialize', () => {
          expect(() => NonNegativeFloat.serialize(-1.0)).toThrow(/Value is a negative number/);
        });

        test('parseValue', () => {
          expect(() => NonNegativeFloat.parseValue(-1.0)).toThrow(/Value is a negative number/);
        });

        test('parseLiteral', () => {
          expect(() => NonNegativeFloat.parseLiteral({ value: -1.0, kind: Kind.FLOAT })).toThrow(/Value is a negative number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => NonNegativeFloat.serialize('-1.0')).toThrow(/Value is a negative number/);
        });

        test('parseValue', () => {
          expect(() => NonNegativeFloat.parseValue('-1.0')).toThrow(/Value is a negative number/);
        });

        test('parseLiteral', () => {
          expect(() => NonNegativeFloat.parseLiteral({ value: '-1.0', kind: Kind.FLOAT })).toThrow(/Value is a negative number/);
        });
      });
    });

    describe('not a number', () => {
      test('serialize', () => {
        expect(() => NonNegativeFloat.serialize('not a number')).toThrow(/Value is not a number/);
      });

      test('parseValue', () => {
        expect(() => NonNegativeFloat.parseValue('not a number')).toThrow(/Value is not a number/);
      });

      test('parseLiteral', () => {
        expect(() => NonNegativeFloat.parseLiteral({ value: 'not a number', kind: Kind.STRING })).toThrow(/Can only validate floating point numbers as non-negative floating point numbers but got a/);
      });
    });
  });
});
