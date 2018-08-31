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
      expect(
        URL.parseLiteral({ value: 'https://test.com', kind: Kind.STRING }),
      ).toBe('https://test.com');
    });
  });

  describe('valid - localhost', () => {
    test('serialize', () => {
      expect(URL.serialize('http://localhost')).toBe('http://localhost');
    });

    test('parseValue', () => {
      expect(URL.parseValue('http://localhost')).toBe('http://localhost');
    });

    test('parseLiteral', () => {
      expect(
        URL.parseLiteral({ value: 'http://localhost', kind: Kind.STRING }),
      ).toBe('http://localhost');
    });
  });

  describe('valid - localhost with port', () => {
    test('serialize', () => {
      expect(URL.serialize('http://localhost:3000')).toBe(
        'http://localhost:3000',
      );
    });

    test('parseValue', () => {
      expect(URL.parseValue('http://localhost:3000')).toBe(
        'http://localhost:3000',
      );
    });

    test('parseLiteral', () => {
      expect(
        URL.parseLiteral({ value: 'http://localhost:3000', kind: Kind.STRING }),
      ).toBe('http://localhost:3000');
    });
  });

  describe('valid - 0.0.0.0', () => {
    test('serialize', () => {
      expect(URL.serialize('http://0.0.0.0')).toBe('http://0.0.0.0');
    });

    test('parseValue', () => {
      expect(URL.parseValue('http://0.0.0.0')).toBe('http://0.0.0.0');
    });

    test('parseLiteral', () => {
      expect(
        URL.parseLiteral({ value: 'http://0.0.0.0', kind: Kind.STRING }),
      ).toBe('http://0.0.0.0');
    });
  });

  describe('valid - 0.0.0.0 with port', () => {
    test('serialize', () => {
      expect(URL.serialize('http://0.0.0.0:3000')).toBe('http://0.0.0.0:3000');
    });

    test('parseValue', () => {
      expect(URL.parseValue('http://0.0.0.0:3000')).toBe('http://0.0.0.0:3000');
    });

    test('parseLiteral', () => {
      expect(
        URL.parseLiteral({ value: 'http://0.0.0.0:3000', kind: Kind.STRING }),
      ).toBe('http://0.0.0.0:3000');
    });
  });

  describe('valid - 127.0.0.1', () => {
    test('serialize', () => {
      expect(URL.serialize('http://127.0.0.1')).toBe('http://127.0.0.1');
    });

    test('parseValue', () => {
      expect(URL.parseValue('http://127.0.0.1')).toBe('http://127.0.0.1');
    });

    test('parseLiteral', () => {
      expect(
        URL.parseLiteral({ value: 'http://127.0.0.1', kind: Kind.STRING }),
      ).toBe('http://127.0.0.1');
    });
  });

  describe('valid - 127.0.0.1 with port', () => {
    test('serialize', () => {
      expect(URL.serialize('http://127.0.0.1:3000')).toBe(
        'http://127.0.0.1:3000',
      );
    });

    test('parseValue', () => {
      expect(URL.parseValue('http://127.0.0.1:3000')).toBe(
        'http://127.0.0.1:3000',
      );
    });

    test('parseLiteral', () => {
      expect(
        URL.parseLiteral({ value: 'http://127.0.0.1:3000', kind: Kind.STRING }),
      ).toBe('http://127.0.0.1:3000');
    });
  });

  describe('invalid', () => {
    describe('not a URL', () => {
      test('serialize', () => {
        expect(() => URL.serialize('this is not a URL')).toThrow(
          /Value is not a valid URL/,
        );
      });

      test('parseValue', () => {
        expect(() => URL.parseValue('this is not a URL')).toThrow(
          /Value is not a valid URL/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          URL.parseLiteral({ value: 'this is not a URL', kind: Kind.STRING }),
        ).toThrow(/Value is not a valid URL/);
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
        expect(() => URL.parseLiteral({ value: 123, kind: Kind.INT })).toThrow(
          /Can only validate strings as URLs but got a/,
        );
      });
    });
  });
});
