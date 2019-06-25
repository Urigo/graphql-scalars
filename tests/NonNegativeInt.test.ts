/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { NonNegativeInt, UnsignedInt } from '../src';

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
          expect(
            NonNegativeInt.parseLiteral({ value: '123', kind: Kind.INT } , {}),
          ).toBe(123);
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
          expect(
            NonNegativeInt.parseLiteral({ value: '123', kind: Kind.INT } , {}),
          ).toBe(123);
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
          expect(
            NonNegativeInt.parseLiteral({ value: '0', kind: Kind.INT } , {}),
          ).toBe(0);
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
          expect(
            NonNegativeInt.parseLiteral({ value: '0', kind: Kind.INT } , {}),
          ).toBe(0);
        });
      });
    });
  });

  describe('invalid', () => {
    describe('null', () => {
      test('serialize', () => {
        expect(() => NonNegativeInt.serialize(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => NonNegativeInt.parseValue(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          NonNegativeInt.parseLiteral({ value: null, kind: Kind.INT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('undefined', () => {
      test('serialize', () => {
        expect(() => NonNegativeInt.serialize(undefined)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => NonNegativeInt.parseValue(undefined)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          NonNegativeInt.parseLiteral({ value: undefined, kind: Kind.INT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('unsafe integer', () => {
      test('serialize', () => {
        expect(() => NonNegativeInt.serialize(2 ** 53)).toThrow(
          /Value is not a safe integer/,
        );
      });

      test('parseValue', () => {
        expect(() => NonNegativeInt.parseValue(2 ** 53)).toThrow(
          /Value is not a safe integer/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          NonNegativeInt.parseLiteral({ value: (2 ** 53).toString(), kind: Kind.INT } , {}),
        ).toThrow(/Value is not a safe integer/);
      });
    });

    describe('less than zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(() => NonNegativeInt.serialize(-1)).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseValue', () => {
          expect(() => NonNegativeInt.parseValue(-1)).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            NonNegativeInt.parseLiteral({ value: '-1', kind: Kind.INT } , {}),
          ).toThrow(/Value is not a non-negative number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => NonNegativeInt.serialize('-1')).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseValue', () => {
          expect(() => NonNegativeInt.parseValue('-1')).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            NonNegativeInt.parseLiteral({ value: '-1', kind: Kind.INT } , {}),
          ).toThrow(/Value is not a non-negative number/);
        });
      });
    });

    describe('infinity', () => {
      test('serialize', () => {
        expect(() =>
          NonNegativeInt.serialize(Number.POSITIVE_INFINITY),
        ).toThrow(/Value is not a finite number/);
      });

      test('parseValue', () => {
        expect(() =>
          NonNegativeInt.parseValue(Number.POSITIVE_INFINITY),
        ).toThrow(/Value is not a finite number/);
      });

      test('parseLiteral', () => {
        expect(() =>
          NonNegativeInt.parseLiteral({
            value: Number.POSITIVE_INFINITY.toString(),
            kind: Kind.INT,
          }, {}),
        ).toThrow(/Value is not a finite number/);
      });
    });

    describe('not a number', () => {
      test('serialize', () => {
        expect(() => NonNegativeInt.serialize('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => NonNegativeInt.parseValue('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          NonNegativeInt.parseLiteral({
            value: 'not a number',
            kind: Kind.STRING,
          }, {}),
        ).toThrow(
          /Can only validate integers as non-negative integers but got a/,
        );
      });
    });

    describe('NaN', () => {
      test('serialize', () => {
        expect(() => NonNegativeInt.serialize(Number.NaN)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => NonNegativeInt.parseValue(Number.NaN)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          NonNegativeInt.parseLiteral({ value: Number.NaN.toString(), kind: Kind.STRING } , {}),
        ).toThrow(
          /Can only validate integers as non-negative integers but got a/,
        );
      });
    });
  });
});

describe('UnsignedInt', () => {
  describe('valid', () => {
    describe('greater than zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(UnsignedInt.serialize(123)).toBe(123);
        });

        test('parseValue', () => {
          expect(UnsignedInt.parseValue(123)).toBe(123);
        });

        test('parseLiteral', () => {
          expect(UnsignedInt.parseLiteral({ value: '123', kind: Kind.INT } , {})).toBe(
            123,
          );
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(UnsignedInt.serialize('123')).toBe(123);
        });

        test('parseValue', () => {
          expect(UnsignedInt.parseValue('123')).toBe(123);
        });

        test('parseLiteral', () => {
          expect(
            UnsignedInt.parseLiteral({ value: '123', kind: Kind.INT } , {}),
          ).toBe(123);
        });
      });
    });

    describe('zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(UnsignedInt.serialize(0)).toBe(0);
        });

        test('parseValue', () => {
          expect(UnsignedInt.parseValue(0)).toBe(0);
        });

        test('parseLiteral', () => {
          expect(UnsignedInt.parseLiteral({ value: '0', kind: Kind.INT } , {})).toBe(
            0,
          );
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(UnsignedInt.serialize('0')).toBe(0);
        });

        test('parseValue', () => {
          expect(UnsignedInt.parseValue('0')).toBe(0);
        });

        test('parseLiteral', () => {
          expect(UnsignedInt.parseLiteral({ value: '0', kind: Kind.INT } , {})).toBe(
            0,
          );
        });
      });
    });
  });

  describe('invalid', () => {
    describe('null', () => {
      test('serialize', () => {
        expect(() => UnsignedInt.serialize(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => UnsignedInt.parseValue(null)).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          UnsignedInt.parseLiteral({ value: null, kind: Kind.INT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('undefined', () => {
      test('serialize', () => {
        expect(() => UnsignedInt.serialize(undefined)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => UnsignedInt.parseValue(undefined)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          UnsignedInt.parseLiteral({ value: undefined, kind: Kind.INT } , {}),
        ).toThrow(/Value is not a number/);
      });
    });

    describe('unsafe integer', () => {
      test('serialize', () => {
        expect(() => UnsignedInt.serialize(2 ** 53)).toThrow(
          /Value is not a safe integer/,
        );
      });

      test('parseValue', () => {
        expect(() => UnsignedInt.parseValue(2 ** 53)).toThrow(
          /Value is not a safe integer/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          UnsignedInt.parseLiteral({ value: (2 ** 53).toString(), kind: Kind.INT } , {}),
        ).toThrow(/Value is not a safe integer/);
      });
    });

    describe('less than zero', () => {
      describe('as int', () => {
        test('serialize', () => {
          expect(() => UnsignedInt.serialize(-1)).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseValue', () => {
          expect(() => UnsignedInt.parseValue(-1)).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            UnsignedInt.parseLiteral({ value: '-1', kind: Kind.INT } , {}),
          ).toThrow(/Value is not a non-negative number/);
        });
      });

      describe('as string', () => {
        test('serialize', () => {
          expect(() => UnsignedInt.serialize('-1')).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseValue', () => {
          expect(() => UnsignedInt.parseValue('-1')).toThrow(
            /Value is not a non-negative number/,
          );
        });

        test('parseLiteral', () => {
          expect(() =>
            UnsignedInt.parseLiteral({ value: '-1', kind: Kind.INT } , {}),
          ).toThrow(/Value is not a non-negative number/);
        });
      });
    });

    describe('infinity', () => {
      test('serialize', () => {
        expect(() => UnsignedInt.serialize(Number.POSITIVE_INFINITY)).toThrow(
          /Value is not a finite number/,
        );
      });

      test('parseValue', () => {
        expect(() => UnsignedInt.parseValue(Number.POSITIVE_INFINITY)).toThrow(
          /Value is not a finite number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          UnsignedInt.parseLiteral({
            value: Number.POSITIVE_INFINITY.toString(),
            kind: Kind.INT,
          }, {}),
        ).toThrow(/Value is not a finite number/);
      });
    });

    describe('not a number', () => {
      test('serialize', () => {
        expect(() => UnsignedInt.serialize('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseValue', () => {
        expect(() => UnsignedInt.parseValue('not a number')).toThrow(
          /Value is not a number/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          UnsignedInt.parseLiteral({
            value: 'not a number',
            kind: Kind.STRING,
          }, {}),
        ).toThrow(
          /Can only validate integers as non-negative integers but got a/,
        );
      });
    });

    describe('NaN', () => {
      test('serialize', () => {
        expect(() => UnsignedInt.serialize(Number.NaN)).toThrow(
          /Value is not a number/,
        );
      });

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // test('parseValue', () => {
      //   expect(() => UnsignedInt.parseValue(Number.NaN)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      test('parseLiteral', () => {
        expect(() =>
          UnsignedInt.parseLiteral({ value: Number.NaN.toString(), kind: Kind.STRING } , {}),
        ).toThrow(
          /Can only validate integers as non-negative integers but got a/,
        );
      });
    });
  });
});
