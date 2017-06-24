/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { URL } from '../';

describe('URL', () => {
  describe('valid', () => {
    test('serialize', () => {
      expect(URL.serialize('https://test.com')).toBe('https://test.com');
    });

    test('parseValue', () => {
      expect(URL.parseValue('https://test.com')).toBe('https://test.com');
    });

    test('parseLiteral', () => {
      expect(URL.parseLiteral({ value: 'https://test.com', kind: Kind.STRING })).toBe('https://test.com');
    });
  });

  describe('invalid', () => {
    describe('not a URL', () => {
      test('serialize', () => {
        expect(() => URL.serialize('this is not a URL')).toThrow(/Value is not a valid URL/);
      });

      test('parseValue', () => {
        expect(() => URL.parseValue('this is not a URL')).toThrow(/Value is not a valid URL/);
      });

      test('parseLiteral', () => {
        expect(() => URL.parseLiteral({ value: 'this is not a URL', kind: Kind.STRING })).toThrow(/Value is not a valid URL/);
      });
    });

    describe('not a string', () => {
      test('serialize', () => {
        expect(() => URL.serialize(123)).toThrow(/Value is not string/);
      });

      test('parseValue', () => {
        expect(() => URL.parseValue(123)).toThrow(/Value is not string/);
      });

      test('parseLiteral', () => {
        expect(() => URL.parseLiteral({ value: 123, kind: Kind.INT })).toThrow(/Can only validate strings as URLs but got a/);
      });
    });
  });
});
