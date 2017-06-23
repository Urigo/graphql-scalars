/* global test, expect */

import { Kind } from 'graphql/language';

import { NonNegativeFloat } from '../';

// Number greater than zero
test('NonNegativeFloat - valid as float - serialize', () => {
  expect(NonNegativeFloat.serialize(123.45)).toBe(123.45);
});

test('NonNegativeFloat - valid as float - parseValue', () => {
  expect(NonNegativeFloat.parseValue(123.45)).toBe(123.45);
});

test('NonNegativeFloat - valid as float - parseLiteral', () => {
  expect(NonNegativeFloat.parseLiteral({ value: 123.45, kind: Kind.FLOAT })).toBe(123.45);
});

test('NonNegativeFloat - valid as string - serialize', () => {
  expect(NonNegativeFloat.serialize('123.45')).toBe(123.45);
});

test('NonNegativeFloat - valid as string - parseValue', () => {
  expect(NonNegativeFloat.parseValue('123.45')).toBe(123.45);
});

test('NonNegativeFloat - valid as string - parseLiteral', () => {
  expect(NonNegativeFloat.parseLiteral({ value: '123.45', kind: Kind.FLOAT })).toBe(123.45);
});


// Number equal to zero
test('NonNegativeFloat - valid zero as float - serialize', () => {
  expect(NonNegativeFloat.serialize(0.0)).toBe(0.0);
});

test('NonNegativeFloat - valid zero as float - parseValue', () => {
  expect(NonNegativeFloat.parseValue(0.0)).toBe(0.0);
});

test('NonNegativeFloat - valid zero as float - parseLiteral', () => {
  expect(NonNegativeFloat.parseLiteral({ value: 0.0, kind: Kind.FLOAT })).toBe(0.0);
});

test('NonNegativeFloat - valid zero as string - serialize', () => {
  expect(NonNegativeFloat.serialize('0.0')).toBe(0.0);
});

test('NonNegativeFloat - valid zero as string - parseValue', () => {
  expect(NonNegativeFloat.parseValue('0.0')).toBe(0.0);
});

test('NonNegativeFloat - valid zero as string - parseLiteral', () => {
  expect(NonNegativeFloat.parseLiteral({ value: '0.0', kind: Kind.FLOAT })).toBe(0.0);
});


// Number less than zero
test('NonNegativeFloat - less than zero as float - serialize', () => {
  expect(() => NonNegativeFloat.serialize(-1.0)).toThrow('Value is a negative number');
});

test('NonNegativeFloat - less than zero as float - parseValue', () => {
  expect(() => NonNegativeFloat.parseValue(-1.0)).toThrow('Value is a negative number');
});

test('NonNegativeFloat - less than zero as float - parseLiteral', () => {
  expect(() => NonNegativeFloat.parseLiteral({ value: -1.0, kind: Kind.FLOAT })).toThrow('Value is a negative number');
});

test('NonNegativeFloat - less than zero as string - serialize', () => {
  expect(() => NonNegativeFloat.serialize('-1.0')).toThrow('Value is a negative number');
});

test('NonNegativeFloat - less than zero as string - parseValue', () => {
  expect(() => NonNegativeFloat.parseValue('-1.0')).toThrow('Value is a negative number');
});

test('NonNegativeFloat - less than zero as string - parseLiteral', () => {
  expect(() => NonNegativeFloat.parseLiteral({ value: '-1.0', kind: Kind.FLOAT })).toThrow('Value is a negative number');
});


// Not a number
test('NonNegativeFloat - not a number - serialize', () => {
  expect(() => NonNegativeFloat.serialize('not a number')).toThrow('Value is not a number');
});

test('NonNegativeFloat - not a number - parseValue', () => {
  expect(() => NonNegativeFloat.parseValue('not a number')).toThrow('Value is not a number');
});

test('NonNegativeFloat - not a number - parseLiteral', () => {
  expect(() => NonNegativeFloat.parseLiteral({ value: 'not a number', kind: Kind.STRING })).toThrow(/Can only validate floating point numbers as non-negative floating point numbers but got a/);
});
