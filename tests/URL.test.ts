/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { URL } from '../src';

/*
 * these test cases are picked up from https://mathiasbynens.be/demo/url-regex
 */

const SHOULD_MATCH = [
  'http://foo.com/blah_blah',
  'http://foo.com/blah_blah/',
  'http://foo.com/blah_blah_(wikipedia)',
  'http://foo.com/blah_blah_(wikipedia)_(again)',
  'http://www.example.com/wpstyle/?p=364',
  'https://www.example.com/foo/?bar=baz&inga=42&quux',
  'http://✪df.ws/123',
  'http://userid:password@example.com:8080',
  'http://userid:password@example.com:8080/',
  'http://userid@example.com',
  'http://userid@example.com/',
  'http://userid@example.com:8080',
  'http://userid@example.com:8080/',
  'http://userid:password@example.com',
  'http://userid:password@example.com/',
  'http://142.42.1.1/',
  'http://142.42.1.1:8080/',
  'http://➡.ws/䨹',
  'http://⌘.ws',
  'http://⌘.ws/',
  'http://foo.com/blah_(wikipedia)#cite-1',
  'http://foo.com/blah_(wikipedia)_blah#cite-1',
  'http://foo.com/unicode_(✪)_in_parens',
  'http://foo.com/(something)?after=parens',
  'http://☺.damowmow.com/',
  'http://code.google.com/events/#&product=browser',
  'http://j.mp',
  'ftp://foo.bar/baz',
  'http://foo.bar/?q=Test%20URL-encoded%20stuff',
  'http://例子.测试',
  'http://उदाहरण.परीक्षा',
  'http://1337.net',
  'http://a.b-c.de',
  'http://223.255.255.254',
  'http://localhost:8080',
  'http://localhost:3000',
  'http://127.0.0.1/',
  'http://127.0.0.1:8080/',
];

const SHOULD_NOT_MATCH = [
  'http://',
  'http://.',
  'http://..',
  'http://../',
  'http://?',
  'http://??',
  'http://??/',
  'http://#',
  'http://##',
  'http://##/',
  'http://foo.bar?q=Spaces should be encoded',
  '//',
  '//a',
  '///a',
  '///',
  'http:///a',
  'foo.com',
  'rdar://1234',
  'h://test',
  'http:// shouldfail.com',
  'http://foo.bar/foo(bar)baz quux',
  'ftps://foo.bar/',
  'http://-error-.invalid/',
  // 'http://a.b--c.de/',
  'http://-a.b.co',
  'http://a.b-.co',
  'http://0.0.0.0',
  'http://10.1.1.0',
  'http://10.1.1.255',
  'http://224.1.1.1',
  'http://1.1.1.1.1',
  'http://123.123.123',
  'http://3628126748',
  'http://.www.foo.bar/',
  // 'http://www.foo.bar./',
  'http://.www.foo.bar./',
  'http://10.1.1.1',
];

describe('URL', () => {
  describe('valid', () => {
    // eslint-disable-next-line
    SHOULD_MATCH.forEach(url => {
      test(`serialize ${url}`, () => {
        expect(URL.serialize(url)).toBe(url);
      });
      test(`parseValue ${url}`, () => {
        expect(URL.parseValue(url)).toBe(url);
      });
      test(`parseLiteral ${url}`, () => {
        expect(URL.parseLiteral({ value: url, kind: Kind.STRING } , {})).toBe(url);
      });
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
        URL.parseLiteral({ value: 'http://localhost', kind: Kind.STRING } , {}),
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
        URL.parseLiteral({ value: 'http://localhost:3000', kind: Kind.STRING } , {}),
      ).toBe('http://localhost:3000');
    });
  });

  describe('invalid', () => {
    describe('not a URL', () => {
      // eslint-disable-next-line
      SHOULD_NOT_MATCH.forEach(url => {
        test(`serialize ${url}`, () => {
          expect(() => URL.serialize(url)).toThrow(/Value is not a valid URL/);
        });

        test(`parseValue ${url}`, () => {
          expect(() => URL.parseValue(url)).toThrow(/Value is not a valid URL/);
        });

        test(`parseLiteral ${url}`, () => {
          expect(() =>
            URL.parseLiteral({ value: url, kind: Kind.STRING } , {}),
          ).toThrow(/Value is not a valid URL/);
        });
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
        expect(() => URL.parseLiteral({ value: '123', kind: Kind.INT } , {})).toThrow(
          /Can only validate strings as URLs but got a/,
        );
      });
    });
  });
});
