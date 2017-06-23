/* global test, expect */

import { Kind } from 'graphql/language';

import { EmailAddress } from '../';

// Valid email address
test('EmailAddress - valid - serialize', () => {
  expect(EmailAddress.serialize('test@test.com')).toBe('test@test.com');
});

test('EmailAddress - valid - parseValue', () => {
  expect(EmailAddress.parseValue('test@test.com')).toBe('test@test.com');
});

test('EmailAddress - valid - parseLiteral', () => {
  expect(EmailAddress.parseLiteral({ value: 'test@test.com', kind: Kind.STRING })).toBe('test@test.com');
});


// Not an email address
test('EmailAddress - not an email address - serialize', () => {
  expect(() => EmailAddress.serialize('this is not an email address')).toThrow(/Value is not a valid email address/);
});

test('EmailAddress - not an email address - parseValue', () => {
  expect(() => EmailAddress.parseValue('this is not an email address')).toThrow(/Value is not a valid email address/);
});

test('EmailAddress - not an email address - parseLiteral', () => {
  expect(() => EmailAddress.parseLiteral({ value: 'this is not an email address', kind: Kind.STRING })).toThrow(/Value is not a valid email address/);
});


// Not a string
test('EmailAddress - not a string - serialize', () => {
  expect(() => EmailAddress.serialize(123)).toThrow(/Value is not string/);
});

test('EmailAddress - not a string - parseValue', () => {
  expect(() => EmailAddress.parseValue(123)).toThrow(/Value is not string/);
});

test('EmailAddress - not a string - parseLiteral', () => {
  expect(() => EmailAddress.parseLiteral({ value: 123, kind: Kind.INT })).toThrow(/Can only validate strings as email addresses but got a/);
});
