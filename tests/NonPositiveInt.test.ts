/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { NonPositiveInt } from '../src';

describe('NonPositiveInt', () => {
  describe('valid', () => {
    describe('as int', () => {
      test('serialize', () => {
        expect(NonPositiveInt.serialize(-123)).toBe(-123);
      });

      test('parseValue', () => {
        expect(NonPositiveInt.parseValue(-123)).toBe(-123);
      });

      test('parseLiteral', () => {
        expect(
          NonPositiveInt.parseLiteral({ value: '-123', kind: Kind.INT } , {}),
        ).toBe(-123);
      });
    });

    describe('as string', () => {
      test('serialize', () => {
        expect(NonPositiveInt.serialize('-123')).toBe(-123);
      });

      test('parseValue', () => {
        expect(NonPositiveInt.parseValue('-123')).toBe(-123);
      });

      test('parseLiteral', () => {
        expect(
          NonPositiveInt.parseLiteral({ value: '-123', kind: Kind.INT } , {}),
        ).toBe(-123);
      });
    });

    describe('zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(NonPositiveInt.serialize(0)).toBe(0);
        });

        test('parseValue', () => {
          expect(NonPositiveInt.parseValue(0)).toBe(0);
        });

        test('parseLiteral', () => {
          expect(
            NonPositiveInt.parseLiteral({ value: '0', kind: Kind.INT } , {}),
          ).toBe(0);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(NonPositiveInt.serialize('0')).toBe(0);
        });

        test('parseValue', () => {
          expect(NonPositiveInt.parseValue('0')).toBe(0);
        });

        test('parseLiteral', () => {
          expect(
            NonPositiveInt.parseLiteral({ value: '0', kind: Kind.INT } , {}),
          ).toBe(0);
        });
      });
    });
  });

  describe('invalid', () => {
    describe('null', () => {
      test('serialize', () => {
        expect(() => NonPositiveInt.serialize(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => NonPositiveInt.parseValue(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          NonPositiveInt.parseLiteral({ value: null, kind: Kind.INT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('undefined', () => {
      test('serialize', () => {
        expect(() => NonPositiveInt.serialize(undefined)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => NonPositiveInt.parseValue(undefined)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          NonPositiveInt.parseLiteral({ value: undefined, kind: Kind.INT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('unsafe integer', () => {
      test('serialize', () => {
        expect(() => NonPositiveInt.serialize(2 ** 53)).toThrow(
          /Value is not a safe integer/,
        );
      });

      test('parseValue', () => {
        expect(() => NonPositiveInt.parseValue(2 ** 53)).toThrow(
          /Value is not a safe integer/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          NonPositiveInt.parseLiteral({ value: (2 ** 53).toString(), kind: Kind.INT } , {}),
        ).toThrow(/Value is not a safe integer/);
      });
    });

    describe('more than zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(() => NonPositiveInt.serialize(1)).toThrow(
            /Value is not a non-positive number/,
          );
        });

        test('parseValue', () => {
          expect(() => NonPositiveInt.parseValue(1)).toThrow(
            /Value is not a non-positive number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            NonPositiveInt.parseLiteral({ value: '1', kind: Kind.INT } , {}),
          ).toThrow(/Value is not a non-positive number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => NonPositiveInt.serialize('1')).toThrow(
            /Value is not a non-positive number/,
          );
        });

        test('parseValue', () => {
          expect(() => NonPositiveInt.parseValue('1')).toThrow(
            /Value is not a non-positive number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            NonPositiveInt.parseLiteral({ value: '1', kind: Kind.INT } , {}),
          ).toThrow(/Value is not a non-positive number/);
        });
      });
    });

    describe('infinity', () => {
      test('serialize', () => {
        expect(() =>
          NonPositiveInt.serialize(Number.NEGATIVE_INFINITY),
        ).toThrow(/Value is not a finite number/);
      });

      test('parseValue', () => {
        expect(() =>
          NonPositiveInt.parseValue(Number.NEGATIVE_INFINITY),
        ).toThrow(/Value is not a finite number/);
      });

      test('parseLiteral', () => {
        expect(() =>
          NonPositiveInt.parseLiteral({
            value: Number.NEGATIVE_INFINITY.toString(),
            kind: Kind.INT,
          }, {}),
        ).toThrow(/Value is not a finite number/);
      });
    });

    describe('not a number', () => {
      test('serialize', () => {
        expect(() => NonPositiveInt.serialize('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => NonPositiveInt.parseValue('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          NonPositiveInt.parseLiteral({
            value: 'not a number',
            kind: Kind.STRING,
          }, {}),
        ).toThrow(
          /Can only validate integers as non-positive integers but got a/,
        );
      });
    });

    describe('NaN', () => {
      test('serialize', () => {
        expect(() => NonPositiveInt.serialize(Number.NaN)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => NonPositiveInt.parseValue(Number.NaN)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          NonPositiveInt.parseLiteral({ value: Number.NaN.toString(), kind: Kind.STRING } , {}),
        ).toThrow(
          /Can only validate integers as non-positive integers but got a/,
        );
      });
    });
  });
});
