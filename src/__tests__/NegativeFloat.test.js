/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { NegativeFloat } from '../';

describe('NegativeFloat', () => {
  describe('valid', () => {
    describe('as float', () => {
      test('serialize', () => {
        expect(NegativeFloat.serialize(-123.45)).toBe(-123.45);
      });

      test('parseValue', () => {
        expect(NegativeFloat.parseValue(-123.45)).toBe(-123.45);
      });

      test('parseLiteral', () => {
        expect(NegativeFloat.parseLiteral({ value: -123.45, kind: Kind.FLOAT })).toBe(-123.45);
      });
    });

    describe('as string', () => {
      test('serialize', () => {
        expect(NegativeFloat.serialize('-123.45')).toBe(-123.45);
      });

      test('parseValue', () => {
        expect(NegativeFloat.parseValue('-123.45')).toBe(-123.45);
      });

      test('parseLiteral', () => {
        expect(NegativeFloat.parseLiteral({ value: '-123.45', kind: Kind.FLOAT })).toBe(-123.45);
      });
    });
  });

  describe('invalid', () => {
    describe('zero', () => {
      describe('as float', () => {
        test('serialize', () => {
          expect(() => NegativeFloat.serialize(0.0)).toThrow(/Value is not a negative number/);
        });

        test('parseValue', () => {
          expect(() => NegativeFloat.parseValue(0.0)).toThrow(/Value is not a negative number/);
        });

        test('parseLiteral', () => {
          expect(() => NegativeFloat.parseLiteral({ value: 0.0, kind: Kind.FLOAT })).toThrow(/Value is not a negative number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => NegativeFloat.serialize('0.0')).toThrow(/Value is not a negative number/);
        });

        test('parseValue', () => {
          expect(() => NegativeFloat.parseValue('0.0')).toThrow(/Value is not a negative number/);
        });

        test('parseLiteral', () => {
          expect(() => NegativeFloat.parseLiteral({ value: '0.0', kind: Kind.FLOAT })).toThrow(/Value is not a negative number/);
        });
      });
    });

    describe('less than zero', () => {
      describe('as float', () => {
        test('serialize', () => {
          expect(() => NegativeFloat.serialize(1.0)).toThrow(/Value is not a negative number/);
        });

        test('parseValue', () => {
          expect(() => NegativeFloat.parseValue(1.0)).toThrow(/Value is not a negative number/);
        });

        test('parseLiteral', () => {
          expect(() => NegativeFloat.parseLiteral({ value: 1.0, kind: Kind.FLOAT })).toThrow(/Value is not a negative number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => NegativeFloat.serialize('1.0')).toThrow(/Value is not a negative number/);
        });

        test('parseValue', () => {
          expect(() => NegativeFloat.parseValue('1.0')).toThrow(/Value is not a negative number/);
        });

        test('parseLiteral', () => {
          expect(() => NegativeFloat.parseLiteral({ value: '1.0', kind: Kind.FLOAT })).toThrow(/Value is not a negative number/);
        });
      });
    });

    describe('not a number', () => {
      test('serialize', () => {
        expect(() => NegativeFloat.serialize('not a number')).toThrow(/Value is not a number/);
      });

      test('parseValue', () => {
        expect(() => NegativeFloat.parseValue('not a number')).toThrow(/Value is not a number/);
      });

      test('parseLiteral', () => {
        expect(() => NegativeFloat.parseLiteral({ value: 'not a number', kind: Kind.STRING })).toThrow(/Can only validate floating point numbers as negative floating point numbers but got a/);
      });
    });
  });
});
