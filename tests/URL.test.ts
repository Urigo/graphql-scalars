/* global describe, test, expect */

import { Kind } from 'graphql/language';

import URLResolver from '../src/resolvers/URL';
import { URL } from 'url';

/*
 * these test cases are picked up from https://mathiasbynens.be/demo/url-regex
 */


describe('URL', () => {

  describe('valid - localhost', () => {
    test('serialize', () => {
      expect(URLResolver.serialize('http://localhost/')).toBe('http://localhost/');
    });

    test('parseValue', () => {
      expect(URLResolver.parseValue('http://localhost/')).toMatchObject(new URL('http://localhost/')
      );
    });

    test('parseLiteral', () => {
      expect(
        URLResolver.parseLiteral({ value: 'http://localhost/', kind: Kind.STRING }, {}),
      ).toMatchObject(new URL('http://localhost/')
      );
    });
  });

  describe('valid - localhost with port', () => {
    test('serialize', () => {
      expect(URLResolver.serialize('http://localhost:3000/')).toBe('http://localhost:3000/');
    });

    test('parseValue', () => {
      expect(URLResolver.parseValue('http://localhost:3000/')).toMatchObject(
        new URL('http://localhost:3000/')
      );
    });

    test('parseLiteral', () => {
      expect(
        URLResolver.parseLiteral({ value: 'http://localhost:3000/', kind: Kind.STRING }, {}),
      ).toMatchObject(new URL('http://localhost:3000/'));
    });
  });

  describe('invalid', () => {
    describe('not a URL', () => {
      expect(() => URLResolver.serialize('invalidurlexample')).toThrow('Invalid URL: invalidurlexample');
    });

    test(`parseValue invalidurlexample`, () => {
      expect(() => URLResolver.parseValue('invalidurlexample')).toThrow('Invalid URL: invalidurlexample');
    });

    test(`parseLiteral invalidurlexample`, () => {
      expect(() =>
        URLResolver.parseLiteral({ value: 'invalidurlexample', kind: Kind.STRING }, {}),
      ).toThrow('Invalid URL: invalidurlexample');
    });
  });

  describe('not a string', () => {
    test('serialize', () => {
      expect(() => URLResolver.serialize(123)).toThrow();
    });

    test('parseValue', () => {
      expect(() => URLResolver.parseValue(123)).toThrow();
    });

    test('parseLiteral', () => {
      expect(() => URLResolver.parseLiteral({ value: '123', kind: Kind.INT }, {})).toThrow();
    });
  });
});
