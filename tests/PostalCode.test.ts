/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { PostalCode } from '../src';

describe('PostalCode', () => {
  describe('valid', () => {
    describe('United States', () => {
      describe('basic', () => {
        test('serialize', () => {
          expect(PostalCode.serialize('60031')).toBe('60031');
        });

        test('parseValue', () => {
          expect(PostalCode.parseValue('60031')).toBe('60031');
        });

        test('parseLiteral', () => {
          expect(
            PostalCode.parseLiteral({ value: '60031', kind: Kind.STRING } , {}),
          ).toBe('60031');
        });
      });
      describe('plus 4', () => {
        test('serialize', () => {
          expect(PostalCode.serialize('60031-1234')).toBe('60031-1234');
        });

        test('parseValue', () => {
          expect(PostalCode.parseValue('60031-1234')).toBe('60031-1234');
        });

        test('parseLiteral', () => {
          expect(
            PostalCode.parseLiteral({ value: '60031-1234', kind: Kind.STRING } , {}),
          ).toBe('60031-1234');
        });
      });
    });

    // TODO: the rest of the countries
    describe('United Kingdom', () => {
      // Hi Paul, John, George and Ringo
      test('serialize', () => {
        expect(PostalCode.serialize('NW8 9AY')).toBe('NW8 9AY');
      });

      test('parseValue', () => {
        expect(PostalCode.parseValue('NW8 9AY')).toBe('NW8 9AY');
      });

      test('parseLiteral', () => {
        expect(
          PostalCode.parseLiteral({ value: 'NW8 9AY', kind: Kind.STRING } , {}),
        ).toBe('NW8 9AY');
      });
    });

    describe('Germany', () => {
      test('serialize', () => {
        expect(PostalCode.serialize('10318')).toBe('10318');
      });

      test('parseValue', () => {
        expect(PostalCode.parseValue('10318')).toBe('10318');
      });

      test('parseLiteral', () => {
        expect(
          PostalCode.parseLiteral({ value: '10318', kind: Kind.STRING } , {}),
        ).toBe('10318');
      });
    });

    describe('Canada', () => {
      test('serialize', () => {
        expect(PostalCode.serialize('M5T 1G2')).toBe('M5T 1G2');
      });

      test('parseValue', () => {
        expect(PostalCode.parseValue('M5T 1G2')).toBe('M5T 1G2');
      });

      test('parseLiteral', () => {
        expect(
          PostalCode.parseLiteral({ value: 'M5T 1G2', kind: Kind.STRING } , {}),
        ).toBe('M5T 1G2');
      });
    });

    describe('France', () => {
      // Hi Xavier!
      test('serialize', () => {
        expect(PostalCode.serialize('34000')).toBe('34000');
      });

      test('parseValue', () => {
        expect(PostalCode.parseValue('34000')).toBe('34000');
      });

      test('parseLiteral', () => {
        expect(
          PostalCode.parseLiteral({ value: '34000', kind: Kind.STRING } , {}),
        ).toBe('34000');
      });
    });

    describe('Italy', () => {
      // Ahhh...Venice!
      test('serialize', () => {
        expect(PostalCode.serialize('30123')).toBe('30123');
      });

      test('parseValue', () => {
        expect(PostalCode.parseValue('30123')).toBe('30123');
      });

      test('parseLiteral', () => {
        expect(
          PostalCode.parseLiteral({ value: '30123', kind: Kind.STRING } , {}),
        ).toBe('30123');
      });
    });

    describe('Australia', () => {
      // Charles says, "Hi Mom."
      test('serialize', () => {
        expect(PostalCode.serialize('4217')).toBe('4217');
      });

      test('parseValue', () => {
        expect(PostalCode.parseValue('4217')).toBe('4217');
      });

      test('parseLiteral', () => {
        expect(
          PostalCode.parseLiteral({ value: '4217', kind: Kind.STRING } , {}),
        ).toBe('4217');
      });
    });

    describe('Netherlands', () => {
      test('serialize', () => {
        expect(PostalCode.serialize('1011 AC')).toBe('1011 AC');
      });

      test('parseValue', () => {
        expect(PostalCode.parseValue('1011 AC')).toBe('1011 AC');
      });

      test('parseLiteral', () => {
        expect(
          PostalCode.parseLiteral({ value: '1011 AC', kind: Kind.STRING } , {}),
        ).toBe('1011 AC');
      });
    });

    describe('Spain', () => {
      test('serialize', () => {
        expect(PostalCode.serialize('28009')).toBe('28009');
      });

      test('parseValue', () => {
        expect(PostalCode.parseValue('28009')).toBe('28009');
      });

      test('parseLiteral', () => {
        expect(
          PostalCode.parseLiteral({ value: '28009', kind: Kind.STRING } , {}),
        ).toBe('28009');
      });
    });

    describe('Denmark', () => {
      test('serialize', () => {
        expect(PostalCode.serialize('2100')).toBe('2100');
      });

      test('parseValue', () => {
        expect(PostalCode.parseValue('2100')).toBe('2100');
      });

      test('parseLiteral', () => {
        expect(
          PostalCode.parseLiteral({ value: '2100', kind: Kind.STRING } , {}),
        ).toBe('2100');
      });
    });

    describe('Sweden', () => {
      test('serialize', () => {
        expect(PostalCode.serialize('114 55')).toBe('114 55');
      });

      test('parseValue', () => {
        expect(PostalCode.parseValue('114 55')).toBe('114 55');
      });

      test('parseLiteral', () => {
        expect(
          PostalCode.parseLiteral({ value: '114 55', kind: Kind.STRING } , {}),
        ).toBe('114 55');
      });
    });

    describe('Belgium', () => {
      test('serialize', () => {
        expect(PostalCode.serialize('1043')).toBe('1043');
      });

      test('parseValue', () => {
        expect(PostalCode.parseValue('1043')).toBe('1043');
      });

      test('parseLiteral', () => {
        expect(
          PostalCode.parseLiteral({ value: '1043', kind: Kind.STRING } , {}),
        ).toBe('1043');
      });
    });

    describe('India', () => {
      test('serialize', () => {
        expect(PostalCode.serialize('110003')).toBe('110003');
      });

      test('parseValue', () => {
        expect(PostalCode.parseValue('110003')).toBe('110003');
      });

      test('parseLiteral', () => {
        expect(
          PostalCode.parseLiteral({ value: '110003', kind: Kind.STRING } , {}),
        ).toBe('110003');
      });
    });
  });

  describe('invalid', () => {
    describe('not a postal code', () => {
      test('serialize', () => {
        expect(() => PostalCode.serialize('this is not a postal code')).toThrow(
          /^Value is not a valid postal code/,
        );
      });

      test('parseValue', () => {
        expect(() => PostalCode.parseValue('this is not a postal code')).toThrow(
          /^Value is not a valid postal code/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          PostalCode.parseLiteral({ value: 'this is not a postal code', kind: Kind.STRING } , {}),
        ).toThrow(/^Value is not a valid postal code/);
      });
    });

    describe('not a string', () => {
      test('serialize', () => {
        expect(() => PostalCode.serialize(123)).toThrow(/Value is not string/);
      });

      test('parseValue', () => {
        expect(() => PostalCode.parseValue(123)).toThrow(/Value is not string/);
      });

      test('parseLiteral', () => {
        expect(() => PostalCode.parseLiteral({ value: '123', kind: Kind.INT } , {})).toThrow(
          /Can only validate strings as postal codes but got a/,
        );
      });
    });
  });
});
