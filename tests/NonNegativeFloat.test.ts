/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { NonNegativeFloat, UnsignedFloat } from '../src';

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
          expect(
            NonNegativeFloat.parseLiteral({ value: '123.45', kind: Kind.FLOAT } , {}),
          ).toBe(123.45);
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
          expect(
            NonNegativeFloat.parseLiteral({
              value: '123.45',
              kind: Kind.FLOAT,
            }, {}),
          ).toBe(123.45);
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
          expect(
            NonNegativeFloat.parseLiteral({ value: '0.0', kind: Kind.FLOAT } , {}),
          ).toBe(0.0);
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
          expect(
            NonNegativeFloat.parseLiteral({ value: '0.0', kind: Kind.FLOAT } , {}),
          ).toBe(0.0);
        });
      });
    });
  });

  describe('invalid', () => {
    describe('null', () => {
      test('serialize', () => {
        expect(() => NonNegativeFloat.serialize(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => NonNegativeFloat.parseValue(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          NonNegativeFloat.parseLiteral({ value: null, kind: Kind.FLOAT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('undefined', () => {
      test('serialize', () => {
        expect(() => NonNegativeFloat.serialize(undefined)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => NonNegativeFloat.parseValue(undefined)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          NonNegativeFloat.parseLiteral({ value: undefined, kind: Kind.FLOAT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('less than zero', () => {
      describe('as float', () => {
        test('serialize', () => {
          expect(() => NonNegativeFloat.serialize(-1.0)).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseValue', () => {
          expect(() => NonNegativeFloat.parseValue(-1.0)).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            NonNegativeFloat.parseLiteral({ value: '-1.0', kind: Kind.FLOAT } , {}),
          ).toThrow(/Value is not a non-negative number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => NonNegativeFloat.serialize('-1.0')).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseValue', () => {
          expect(() => NonNegativeFloat.parseValue('-1.0')).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            NonNegativeFloat.parseLiteral({ value: '-1.0', kind: Kind.FLOAT } , {}),
          ).toThrow(/Value is not a non-negative number/);
        });
      });
    });

    describe('infinity', () => {
      test('serialize', () => {
        expect(() =>
          NonNegativeFloat.serialize(Number.POSITIVE_INFINITY),
        ).toThrow(/Value is not a finite number/);
      });

      test('parseValue', () => {
        expect(() =>
          NonNegativeFloat.parseValue(Number.POSITIVE_INFINITY),
        ).toThrow(/Value is not a finite number/);
      });

      test('parseLiteral', () => {
        expect(() =>
          NonNegativeFloat.parseLiteral({
            value: Number.POSITIVE_INFINITY.toString(),
            kind: Kind.FLOAT,
          }, {}),
        ).toThrow(/Value is not a finite number/);
      });
    });

    describe('not a number', () => {
      test('serialize', () => {
        expect(() => NonNegativeFloat.serialize('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => NonNegativeFloat.parseValue('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          NonNegativeFloat.parseLiteral({
            value: 'not a number',
            kind: Kind.STRING,
          }, {}),
        ).toThrow(
          /Can only validate floating point numbers as non-negative floating point numbers but got a/,
        );
      });
    });

    describe('NaN', () => {
      test('serialize', () => {
        expect(() => NonNegativeFloat.serialize(Number.NaN)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => NonNegativeFloat.parseValue(Number.NaN)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          NonNegativeFloat.parseLiteral({
            value: Number.NaN.toString(),
            kind: Kind.STRING,
          }, {}),
        ).toThrow(
          /Can only validate floating point numbers as non-negative floating point numbers but got a/,
        );
      });
    });
  });
});

describe('UnsignedFloat', () => {
  describe('valid', () => {
    describe('greater than zero', () => {
      describe('as float', () => {
        test('serialize', () => {
          expect(UnsignedFloat.serialize(123.45)).toBe(123.45);
        });

        test('parseValue', () => {
          expect(UnsignedFloat.parseValue(123.45)).toBe(123.45);
        });

        test('parseLiteral', () => {
          expect(
            UnsignedFloat.parseLiteral({ value: '123.45', kind: Kind.FLOAT } , {}),
          ).toBe(123.45);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(UnsignedFloat.serialize('123.45')).toBe(123.45);
        });

        test('parseValue', () => {
          expect(UnsignedFloat.parseValue('123.45')).toBe(123.45);
        });

        test('parseLiteral', () => {
          expect(
            UnsignedFloat.parseLiteral({
              value: '123.45',
              kind: Kind.FLOAT,
            }, {}),
          ).toBe(123.45);
        });
      });
    });

    describe('zero', () => {
      describe('as float', () => {
        test('serialize', () => {
          expect(UnsignedFloat.serialize(0.0)).toBe(0.0);
        });

        test('parseValue', () => {
          expect(UnsignedFloat.parseValue(0.0)).toBe(0.0);
        });

        test('parseLiteral', () => {
          expect(
            UnsignedFloat.parseLiteral({ value: '0.0', kind: Kind.FLOAT } , {}),
          ).toBe(0.0);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(UnsignedFloat.serialize('0.0')).toBe(0.0);
        });

        test('parseValue', () => {
          expect(UnsignedFloat.parseValue('0.0')).toBe(0.0);
        });

        test('parseLiteral', () => {
          expect(
            UnsignedFloat.parseLiteral({ value: '0.0', kind: Kind.FLOAT } , {}),
          ).toBe(0.0);
        });
      });
    });
  });

  describe('invalid', () => {
    describe('null', () => {
      test('serialize', () => {
        expect(() => UnsignedFloat.serialize(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => UnsignedFloat.parseValue(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          UnsignedFloat.parseLiteral({ value: null, kind: Kind.FLOAT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('undefined', () => {
      test('serialize', () => {
        expect(() => UnsignedFloat.serialize(undefined)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => UnsignedFloat.parseValue(undefined)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          UnsignedFloat.parseLiteral({ value: undefined, kind: Kind.FLOAT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('less than zero', () => {
      describe('as float', () => {
        test('serialize', () => {
          expect(() => UnsignedFloat.serialize(-1.0)).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseValue', () => {
          expect(() => UnsignedFloat.parseValue(-1.0)).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            UnsignedFloat.parseLiteral({ value: '-1.0', kind: Kind.FLOAT } , {}),
          ).toThrow(/Value is not a non-negative number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => UnsignedFloat.serialize('-1.0')).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseValue', () => {
          expect(() => UnsignedFloat.parseValue('-1.0')).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            UnsignedFloat.parseLiteral({ value: '-1.0', kind: Kind.FLOAT } , {}),
          ).toThrow(/Value is not a non-negative number/);
        });
      });
    });

    describe('infinity', () => {
      test('serialize', () => {
        expect(() => UnsignedFloat.serialize(Number.POSITIVE_INFINITY)).toThrow(
          /Value is not a finite number/,
        );
      });

      test('parseValue', () => {
        expect(() =>
          UnsignedFloat.parseValue(Number.POSITIVE_INFINITY),
        ).toThrow(/Value is not a finite number/);
      });

      test('parseLiteral', () => {
        expect(() =>
          UnsignedFloat.parseLiteral({
            value: Number.POSITIVE_INFINITY.toString(),
            kind: Kind.FLOAT,
          }, {}),
        ).toThrow(/Value is not a finite number/);
      });
    });

    describe('not a number', () => {
      test('serialize', () => {
        expect(() => UnsignedFloat.serialize('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => UnsignedFloat.parseValue('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          UnsignedFloat.parseLiteral({
            value: 'not a number',
            kind: Kind.STRING,
          }, {}),
        ).toThrow(
          /Can only validate floating point numbers as non-negative floating point numbers but got a/,
        );
      });
    });

    describe('NaN', () => {
      test('serialize', () => {
        expect(() => UnsignedFloat.serialize(Number.NaN)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => UnsignedFloat.parseValue(Number.NaN)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          UnsignedFloat.parseLiteral({
            value: Number.NaN.toString(),
            kind: Kind.STRING,
          }, {}),
        ).toThrow(
          /Can only validate floating point numbers as non-negative floating point numbers but got a/,
        );
      });
    });
  });
});
