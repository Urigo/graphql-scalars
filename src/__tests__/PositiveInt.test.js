/* global test, expect */

import { Kind } from 'graphql/language';

import { PositiveInt } from '../';

// Number greater than zero
test('PositiveInt - valid as int - serialize', () => {
  expect(PositiveInt.serialize(123)).toBe(123);
});

test('PositiveInt - valid as int - parseValue', () => {
  expect(PositiveInt.parseValue(123)).toBe(123);
});

test('PositiveInt - valid as int - parseLiteral', () => {
  expect(PositiveInt.parseLiteral({ value: 123, kind: Kind.INT })).toBe(123);
});

test('PositiveInt - valid as string - serialize', () => {
  expect(PositiveInt.serialize('123')).toBe(123);
});

test('PositiveInt - valid as string - parseValue', () => {
  expect(PositiveInt.parseValue('123')).toBe(123);
});

test('PositiveInt - valid as string - parseLiteral', () => {
  expect(PositiveInt.parseLiteral({ value: '123', kind: Kind.INT })).toBe(123);
});


// Number equal to zero
test('PositiveInt - zero as int - serialize', () => {
  expect(() => PositiveInt.serialize(0)).toThrow(/Value is not a positive number/);
});

test('PositiveInt - zero as int - parseValue', () => {
  expect(() => PositiveInt.parseValue(0)).toThrow(/Value is not a positive number/);
});

test('PositiveInt - zero as int - parseLiteral', () => {
  expect(() => PositiveInt.parseLiteral({ value: 0, kind: Kind.INT })).toThrow(/Value is not a positive number/);
});

test('PositiveInt - zero as string - serialize', () => {
  expect(() => PositiveInt.serialize('0')).toThrow(/Value is not a positive number/);
});

test('PositiveInt - zero as string - parseValue', () => {
  expect(() => PositiveInt.parseValue('0')).toThrow(/Value is not a positive number/);
});

test('PositiveInt - zero as string - parseLiteral', () => {
  expect(() => PositiveInt.parseLiteral({ value: '0', kind: Kind.INT })).toThrow(/Value is not a positive number/);
});


// Number less than zero
test('PositiveInt - less than zero as int - serialize', () => {
  expect(() => PositiveInt.serialize(-1)).toThrow(/Value is not a positive number/);
});

test('PositiveInt - less than zero as int - parseValue', () => {
  expect(() => PositiveInt.parseValue(-1)).toThrow(/Value is not a positive number/);
});

test('PositiveInt - less than zero as int - parseLiteral', () => {
  expect(() => PositiveInt.parseLiteral({ value: -1, kind: Kind.INT })).toThrow(/Value is not a positive number/);
});

test('PositiveInt - less than zero as string - serialize', () => {
  expect(() => PositiveInt.serialize('-1')).toThrow(/Value is not a positive number/);
});

test('PositiveInt - less than zero as string - parseValue', () => {
  expect(() => PositiveInt.parseValue('-1')).toThrow(/Value is not a positive number/);
});

test('PositiveInt - less than zero as string - parseLiteral', () => {
  expect(() => PositiveInt.parseLiteral({ value: '-1', kind: Kind.INT })).toThrow(/Value is not a positive number/);
});


// Not a number
test('PositiveInt - not a number - serialize', () => {
  expect(() => PositiveInt.serialize('not a number')).toThrow(/Value is not a number/);
});

test('PositiveInt - not a number - parseValue', () => {
  expect(() => PositiveInt.parseValue('not a number')).toThrow(/Value is not a number/);
});

test('PositiveInt - not a number - parseLiteral', () => {
  expect(() => PositiveInt.parseLiteral({ value: 'not a number', kind: Kind.STRING })).toThrow(/Can only validate integers as positive integers but got a/);
});
