/* global test, expect */

import { Kind } from 'graphql/language';

import { EmailAddress } from '../';

// Number greater than zero
test('EmailAddress - TBD - serialize', () => {
  // expect(EmailAddress.serialize(123.45)).toBe(123.45);
  expect(1).toBe(2);
});

test('EmailAddress - TBD - parseLiteral', () => {
  // expect(() => EmailAddress.parseLiteral({ value: 'not a number', kind: Kind.STRING })).toThrow(/Can only validate floating point numbers as positive floating point numbers but got a/);
  expect(1).toBe(2);
});
