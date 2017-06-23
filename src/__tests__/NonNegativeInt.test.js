/* global test, expect */

import { Kind } from 'graphql/language';

import { NonNegativeInt } from '../';

// Number greater than zero
test('NonNegativeInt - valid as int - serialize', () => {
  expect(NonNegativeInt.serialize(123)).toBe(123);
});

test('NonNegativeInt - valid as int - parseValue', () => {
  expect(NonNegativeInt.parseValue(123)).toBe(123);
});

test('NonNegativeInt - valid as int - parseLiteral', () => {
  expect(NonNegativeInt.parseLiteral({ value: 123, kind: Kind.INT })).toBe(123);
});

test('NonNegativeInt - valid as string - serialize', () => {
  expect(NonNegativeInt.serialize('123')).toBe(123);
});

test('NonNegativeInt - valid as string - parseValue', () => {
  expect(NonNegativeInt.parseValue('123')).toBe(123);
});

test('NonNegativeInt - valid as string - parseLiteral', () => {
  expect(NonNegativeInt.parseLiteral({ value: '123', kind: Kind.INT })).toBe(123);
});


// Number equal to zero
test('NonNegativeInt - valid zero as int - serialize', () => {
  expect(NonNegativeInt.serialize(0)).toBe(0);
});

test('NonNegativeInt - valid zero as int - parseValue', () => {
  expect(NonNegativeInt.parseValue(0)).toBe(0);
});

test('NonNegativeInt - valid zero as int - parseLiteral', () => {
  expect(NonNegativeInt.parseLiteral({ value: 0, kind: Kind.INT })).toBe(0);
});

test('NonNegativeInt - valid zero as string - serialize', () => {
  expect(NonNegativeInt.serialize('0')).toBe(0);
});

test('NonNegativeInt - valid zero as string - parseValue', () => {
  expect(NonNegativeInt.parseValue('0')).toBe(0);
});

test('NonNegativeInt - valid zero as string - parseLiteral', () => {
  expect(NonNegativeInt.parseLiteral({ value: '0', kind: Kind.INT })).toBe(0);
});


// Number less than zero
test('NonNegativeInt - less than zero as int - serialize', () => {
  expect(() => NonNegativeInt.serialize(-1)).toThrow('Value is a negative number');
});

test('NonNegativeInt - less than zero as int - parseValue', () => {
  expect(() => NonNegativeInt.parseValue(-1)).toThrow('Value is a negative number');
});

test('NonNegativeInt - less than zero as int - parseLiteral', () => {
  expect(() => NonNegativeInt.parseLiteral({ value: -1, kind: Kind.INT })).toThrow('Value is a negative number');
});

test('NonNegativeInt - less than zero as string - serialize', () => {
  expect(() => NonNegativeInt.serialize('-1')).toThrow('Value is a negative number');
});

test('NonNegativeInt - less than zero as string - parseValue', () => {
  expect(() => NonNegativeInt.parseValue('-1')).toThrow('Value is a negative number');
});

test('NonNegativeInt - less than zero as string - parseLiteral', () => {
  expect(() => NonNegativeInt.parseLiteral({ value: '-1', kind: Kind.INT })).toThrow('Value is a negative number');
});


// Not a number
test('NonNegativeInt - not a number - serialize', () => {
  expect(() => NonNegativeInt.serialize('not a number')).toThrow('Value is not a number');
});

test('NonNegativeInt - not a number - parseValue', () => {
  expect(() => NonNegativeInt.parseValue('not a number')).toThrow('Value is not a number');
});

test('NonNegativeInt - not a number - parseLiteral', () => {
  expect(() => NonNegativeInt.parseLiteral({ value: 'not a number', kind: Kind.STRING })).toThrow(/Can only validate integers as non-negative integers but got a/);
});
