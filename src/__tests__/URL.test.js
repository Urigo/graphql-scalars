/* global test, expect */

import { Kind } from 'graphql/language';

import { URL } from '../';

// Valid email address
test('URL - valid - serialize', () => {
  expect(URL.serialize('https://test.com')).toBe('https://test.com');
});

test('URL - valid - parseValue', () => {
  expect(URL.parseValue('https://test.com')).toBe('https://test.com');
});

test('URL - valid - parseLiteral', () => {
  expect(URL.parseLiteral({ value: 'https://test.com', kind: Kind.STRING })).toBe('https://test.com');
});


// Not a URL
test('URL - not a URL - serialize', () => {
  expect(() => URL.serialize('this is not a URL')).toThrow(/Value is not a valid URL/);
});

test('URL - not a URL - parseValue', () => {
  expect(() => URL.parseValue('this is not a URL')).toThrow(/Value is not a valid URL/);
});

test('URL - not a URL - parseLiteral', () => {
  expect(() => URL.parseLiteral({ value: 'this is not a URL', kind: Kind.STRING })).toThrow(/Value is not a valid URL/);
});


// Not a string
test('URL - not a string - serialize', () => {
  expect(() => URL.serialize(123)).toThrow(/Value is not string/);
});

test('URL - not a string - parseValue', () => {
  expect(() => URL.parseValue(123)).toThrow(/Value is not string/);
});

test('URL - not a string - parseLiteral', () => {
  expect(() => URL.parseLiteral({ value: 123, kind: Kind.INT })).toThrow(/Can only validate strings as URLs but got a/);
});
