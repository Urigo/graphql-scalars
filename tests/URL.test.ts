/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { URL as URLScalar } from '../src';

/*
 * these test cases are picked up from https://mathiasbynens.be/demo/url-regex
 */


describe('URL', () => {

  describe('valid - localhost', () => {
    test('serialize', () => {
      expect(URLScalar.serialize('http://localhost/')).toBe('http://localhost/')
    });

    test('parseValue', () => {
      expect(URLScalar.parseValue('http://localhost/')).toMatchObject(new URL('http://localhost/')
      )
    });

    test('parseLiteral', () => {
      expect(
        URLScalar.parseLiteral({ value: 'http://localhost/', kind: Kind.STRING }, {}),
      ).toMatchObject(new URL('http://localhost/')
      )
    });
  });

  describe('valid - localhost with port', () => {
    test('serialize', () => {
      expect(URLScalar.serialize('http://localhost:3000/')).toBe('http://localhost:3000/');
    });

    test('parseValue', () => {
      expect(URLScalar.parseValue('http://localhost:3000/')).toMatchObject(
        new URL('http://localhost:3000/')
      );
    });

    test('parseLiteral', () => {
      expect(
        URLScalar.parseLiteral({ value: 'http://localhost:3000/', kind: Kind.STRING }, {}),
      ).toMatchObject(new URL('http://localhost:3000/'));
    });
  });

  describe('invalid', () => {
    describe('not a URL', () => {
      expect(() => URLScalar.serialize('invalidurlexample')).toThrow('Invalid URL: invalidurlexample');
    });

    test(`parseValue invalidurlexample`, () => {
      expect(() => URLScalar.parseValue('invalidurlexample')).toThrow('Invalid URL: invalidurlexample');
    });

    test(`parseLiteral invalidurlexample`, () => {
      expect(() =>
      URLScalar.parseLiteral({ value: 'invalidurlexample', kind: Kind.STRING }, {}),
      ).toThrow('Invalid URL: invalidurlexample');
    });
  });

  describe('not a string', () => {
    test('serialize', () => {
      expect(() => URLScalar.serialize(123)).toThrow(/Value is not string/);
    });

    test('parseValue', () => {
      expect(() => URLScalar.parseValue(123)).toThrow(/Value is not string/);
    });

    test('parseLiteral', () => {
      expect(() => URLScalar.parseLiteral({ value: '123', kind: Kind.INT }, {})).toThrow(
        /Can only validate strings as URLs but got a/,
      );
    });
  });
});
