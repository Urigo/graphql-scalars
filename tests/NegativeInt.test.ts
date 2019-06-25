/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { NegativeInt } from '../src';

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
        expect(NegativeInt.parseLiteral({ value: (-123).toString(), kind: Kind.INT } , {})).toBe(
          -123,
        );
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
        expect(
          NegativeInt.parseLiteral({ value: '-123', kind: Kind.INT } , {}),
        ).toBe(-123);
      });
    });
  });

  describe('invalid', () => {
    describe('null', () => {
      test('serialize', () => {
        expect(() => NegativeInt.serialize(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => NegativeInt.parseValue(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          NegativeInt.parseLiteral({ value: null, kind: Kind.INT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('undefined', () => {
      test('serialize', () => {
        expect(() => NegativeInt.serialize(undefined)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => NegativeInt.parseValue(undefined)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          NegativeInt.parseLiteral({ value: undefined, kind: Kind.INT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('unsafe integer', () => {
      test('serialize', () => {
        expect(() => NegativeInt.serialize(2 ** 53)).toThrow(
          /Value is not a safe integer/,
        );
      });

      test('parseValue', () => {
        expect(() => NegativeInt.parseValue(2 ** 53)).toThrow(
          /Value is not a safe integer/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          NegativeInt.parseLiteral({ value: (2 ** 53).toString(), kind: Kind.INT } , {}),
        ).toThrow(/Value is not a safe integer/);
      });
    });

    describe('zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(() => NegativeInt.serialize(0)).toThrow(
            /Value is not a negative number/,
          );
        });

        test('parseValue', () => {
          expect(() => NegativeInt.parseValue(0)).toThrow(
            /Value is not a negative number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            NegativeInt.parseLiteral({ value: '0', kind: Kind.INT } , {}),
          ).toThrow(/Value is not a negative number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => NegativeInt.serialize('0')).toThrow(
            /Value is not a negative number/,
          );
        });

        test('parseValue', () => {
          expect(() => NegativeInt.parseValue('0')).toThrow(
            /Value is not a negative number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            NegativeInt.parseLiteral({ value: '0', kind: Kind.INT } , {}),
          ).toThrow(/Value is not a negative number/);
        });
      });
    });

    describe('less than zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(() => NegativeInt.serialize(1)).toThrow(
            /Value is not a negative number/,
          );
        });

        test('parseValue', () => {
          expect(() => NegativeInt.parseValue(1)).toThrow(
            /Value is not a negative number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            NegativeInt.parseLiteral({ value: '1', kind: Kind.INT } , {}),
          ).toThrow(/Value is not a negative number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => NegativeInt.serialize('1')).toThrow(
            /Value is not a negative number/,
          );
        });

        test('parseValue', () => {
          expect(() => NegativeInt.parseValue('1')).toThrow(
            /Value is not a negative number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            NegativeInt.parseLiteral({ value: '1', kind: Kind.INT } , {}),
          ).toThrow(/Value is not a negative number/);
        });
      });
    });

    describe('infinity', () => {
      test('serialize', () => {
        expect(() => NegativeInt.serialize(Number.NEGATIVE_INFINITY)).toThrow(
          /Value is not a finite number/,
        );
      });

      test('parseValue', () => {
        expect(() => NegativeInt.parseValue(Number.NEGATIVE_INFINITY)).toThrow(
          /Value is not a finite number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          NegativeInt.parseLiteral({
            value: Number.NEGATIVE_INFINITY.toString(),
            kind: Kind.INT,
          } , {}),
        ).toThrow(/Value is not a finite number/);
      });
    });

    describe('not a number', () => {
      test('serialize', () => {
        expect(() => NegativeInt.serialize('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => NegativeInt.parseValue('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          NegativeInt.parseLiteral({
            value: 'not a number',
            kind: Kind.STRING,
          }, {}),
        ).toThrow(/Can only validate integers as negative integers but got a/);
      });
    });

    describe('NaN', () => {
      test('serialize', () => {
        expect(() => NegativeInt.serialize(Number.NaN)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => NegativeInt.parseValue(Number.NaN)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          NegativeInt.parseLiteral({ value: Number.NaN.toString(), kind: Kind.STRING } , {}),
        ).toThrow(/Can only validate integers as negative integers but got a/);
      });
    });
  });
});
