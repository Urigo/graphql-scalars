/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { PositiveFloat } from '../src';

describe('PositiveFloat', () => {
  describe('valid', () => {
    describe('as float', () => {
      test('serialize', () => {
        expect(PositiveFloat.serialize(123.45)).toBe(123.45);
      });

      test('parseValue', () => {
        expect(PositiveFloat.parseValue(123.45)).toBe(123.45);
      });

      test('parseLiteral', () => {
        expect(
          PositiveFloat.parseLiteral({ value: '123.45', kind: Kind.FLOAT } , {}),
        ).toBe(123.45);
      });
    });

    describe('as string', () => {
      test('serialize', () => {
        expect(PositiveFloat.serialize('123.45')).toBe(123.45);
      });

      test('parseValue', () => {
        expect(PositiveFloat.parseValue('123.45')).toBe(123.45);
      });

      test('parseLiteral', () => {
        expect(
          PositiveFloat.parseLiteral({ value: '123.45', kind: Kind.FLOAT } , {}),
        ).toBe(123.45);
      });
    });
  });

  describe('invalid', () => {
    describe('null', () => {
      test('serialize', () => {
        expect(() => PositiveFloat.serialize(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => PositiveFloat.parseValue(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          PositiveFloat.parseLiteral({ value: null, kind: Kind.FLOAT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('undefined', () => {
      test('serialize', () => {
        expect(() => PositiveFloat.serialize(undefined)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => PositiveFloat.parseValue(undefined)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          PositiveFloat.parseLiteral({ value: undefined, kind: Kind.FLOAT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('zero', () => {
      describe('as float', () => {
        test('serialize', () => {
          expect(() => PositiveFloat.serialize(0.0)).toThrow(
            /Value is not a positive number/,
          );
        });

        test('parseValue', () => {
          expect(() => PositiveFloat.parseValue(0.0)).toThrow(
            /Value is not a positive number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            PositiveFloat.parseLiteral({ value: '0', kind: Kind.FLOAT } , {}),
          ).toThrow(/Value is not a positive number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => PositiveFloat.serialize('0.0')).toThrow(
            /Value is not a positive number/,
          );
        });

        test('parseValue', () => {
          expect(() => PositiveFloat.parseValue('0.0')).toThrow(
            /Value is not a positive number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            PositiveFloat.parseLiteral({ value: '0.0', kind: Kind.FLOAT } , {}),
          ).toThrow(/Value is not a positive number/);
        });
      });
    });

    describe('less than zero', () => {
      describe('as float', () => {
        test('serialize', () => {
          expect(() => PositiveFloat.serialize(-1.0)).toThrow(
            /Value is not a positive number/,
          );
        });

        test('parseValue', () => {
          expect(() => PositiveFloat.parseValue(-1.0)).toThrow(
            /Value is not a positive number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            PositiveFloat.parseLiteral({ value: '-1.0', kind: Kind.FLOAT } , {}),
          ).toThrow(/Value is not a positive number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => PositiveFloat.serialize('-1.0')).toThrow(
            /Value is not a positive number/,
          );
        });

        test('parseValue', () => {
          expect(() => PositiveFloat.parseValue('-1.0')).toThrow(
            /Value is not a positive number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            PositiveFloat.parseLiteral({ value: '-1.0', kind: Kind.FLOAT } , {}),
          ).toThrow(/Value is not a positive number/);
        });
      });
    });

    describe('infinity', () => {
      test('serialize', () => {
        expect(() => PositiveFloat.serialize(Number.POSITIVE_INFINITY)).toThrow(
          /Value is not a finite number/,
        );
      });

      test('parseValue', () => {
        expect(() =>
          PositiveFloat.parseValue(Number.POSITIVE_INFINITY),
        ).toThrow(/Value is not a finite number/);
      });

      test('parseLiteral', () => {
        expect(() =>
          PositiveFloat.parseLiteral({
            value: Number.POSITIVE_INFINITY.toString(),
            kind: Kind.FLOAT,
          }, {}),
        ).toThrow(/Value is not a finite number/);
      });
    });

    describe('not a number', () => {
      test('serialize', () => {
        expect(() => PositiveFloat.serialize('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => PositiveFloat.parseValue('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          PositiveFloat.parseLiteral({
            value: 'not a number',
            kind: Kind.STRING,
          }, {}),
        ).toThrow(
          /Can only validate floating point numbers as positive floating point numbers but got a/,
        );
      });
    });

    describe('NaN', () => {
      test('serialize', () => {
        expect(() => PositiveFloat.serialize(Number.NaN)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => PositiveFloat.parseValue(Number.NaN)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          PositiveFloat.parseLiteral({ value: Number.NaN.toString(), kind: Kind.STRING } , {}),
        ).toThrow(
          /Can only validate floating point numbers as positive floating point numbers but got a/,
        );
      });
    });
  });
});
