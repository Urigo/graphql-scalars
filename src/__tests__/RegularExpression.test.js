/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { RegularExpression } from '../';

describe('RegularExpression', () => {
  const Abc = RegularExpression('Abc', /^abc$/);

  describe('valid', () => {
    test('serialize', () => {
      expect(Abc.serialize('abc')).toBe('abc');
    });

    test('parseValue', () => {
      expect(Abc.parseValue('abc')).toBe('abc');
    });

    test('parseLiteral', () => {
      expect(
        Abc.parseLiteral({ value: 'abc', kind: Kind.STRING }),
      ).toBe('abc');
    });
  });

  describe('invalid', () => {
    describe('does not match', () => {
      test('serialize', () => {
        expect(() => Abc.serialize('this does not match')).toThrow(
          /Value does not match the regular expression/,
        );
      });

      test('parseValue', () => {
        expect(() => Abc.parseValue('this does not match')).toThrow(
          /Value does not match the regular expression/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          Abc.parseLiteral({ value: 'this does not match', kind: Kind.STRING }),
        ).toThrow(/Value does not match the regular expression/);
      });
    });

    describe('not a string', () => {
      test('serialize', () => {
        expect(() => Abc.serialize(123)).toThrow(/Value is not string/);
      });

      test('parseValue', () => {
        expect(() => Abc.parseValue(123)).toThrow(/Value is not string/);
      });

      test('parseLiteral', () => {
        expect(() => Abc.parseLiteral({ value: 123, kind: Kind.INT })).toThrow(
          /Can only validate strings as regular expressions but got a/,
        );
      });
    });
  });
});
