/* global test, expect */

import { Kind } from 'graphql/language';

import { DateTime } from '../';

// Valid Date
test('DateTime - valid - serialize', () => {
  const now = new Date();
  expect(DateTime.serialize(now)).toEqual(now.toJSON());
});

test('DateTime - valid - parseValue', () => {
  const now = new Date();
  expect(DateTime.parseValue(now)).toEqual(now);
});

test('DateTime - valid - parseLiteral', () => {
  const result = new Date(Date.UTC(2017, 0, 2, 3, 4, 5, 0));
  expect(DateTime.parseLiteral({ value: '2017-01-02T03:04:05.000Z', kind: Kind.STRING })).toEqual(result);
});


// Not a valid Date
test('DateTime - not a valid date - serialize', () => {
  expect(() => DateTime.serialize('this is not a date')).toThrow(/Value is not an instance of Date/);
});

test('DateTime - not a valid date - parseValue', () => {
  expect(() => DateTime.parseValue('this is not a date')).toThrow(/Value is not a valid Date/);
});

test('DateTime - not a valid date - parseLiteral', () => {
  expect(() => DateTime.parseLiteral({ value: 'this is not a date', kind: Kind.STRING })).toThrow(/Value is not a valid Date/);
});
