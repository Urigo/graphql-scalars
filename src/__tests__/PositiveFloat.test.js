/* global test, expect */

import { Kind } from 'graphql/language';

import { PositiveFloat } from '../';

// Number greater than zero
test('PositiveFloat - valid as float - serialize', () => {
  expect(PositiveFloat.serialize(123.45)).toBe(123.45);
});

test('PositiveFloat - valid as float - parseValue', () => {
  expect(PositiveFloat.parseValue(123.45)).toBe(123.45);
});

test('PositiveFloat - valid as float - parseLiteral', () => {
  expect(PositiveFloat.parseLiteral({ value: 123.45, kind: Kind.FLOAT })).toBe(123.45);
});

test('PositiveFloat - valid as string - serialize', () => {
  expect(PositiveFloat.serialize('123.45')).toBe(123.45);
});

test('PositiveFloat - valid as string - parseValue', () => {
  expect(PositiveFloat.parseValue('123.45')).toBe(123.45);
});

test('PositiveFloat - valid as string - parseLiteral', () => {
  expect(PositiveFloat.parseLiteral({ value: '123.45', kind: Kind.FLOAT })).toBe(123.45);
});


// Number equal to zero
test('PositiveFloat - zero as float - serialize', () => {
  expect(() => PositiveFloat.serialize(0.0)).toThrow(/Value is not a positive number/);
});

test('PositiveFloat - zero as float - parseValue', () => {
  expect(() => PositiveFloat.parseValue(0.0)).toThrow(/Value is not a positive number/);
});

test('PositiveFloat - zero as float - parseLiteral', () => {
  expect(() => PositiveFloat.parseLiteral({ value: 0.0, kind: Kind.FLOAT })).toThrow(/Value is not a positive number/);
});

test('PositiveFloat - zero as string - serialize', () => {
  expect(() => PositiveFloat.serialize('0.0')).toThrow(/Value is not a positive number/);
});

test('PositiveFloat - zero as string - parseValue', () => {
  expect(() => PositiveFloat.parseValue('0.0')).toThrow(/Value is not a positive number/);
});

test('PositiveFloat - zero as string - parseLiteral', () => {
  expect(() => PositiveFloat.parseLiteral({ value: '0.0', kind: Kind.FLOAT })).toThrow(/Value is not a positive number/);
});


// Number less than zero
test('PositiveFloat - less than zero as float - serialize', () => {
  expect(() => PositiveFloat.serialize(-1.0)).toThrow(/Value is not a positive number/);
});

test('PositiveFloat - less than zero as float - parseValue', () => {
  expect(() => PositiveFloat.parseValue(-1.0)).toThrow(/Value is not a positive number/);
});

test('PositiveFloat - less than zero as float - parseLiteral', () => {
  expect(() => PositiveFloat.parseLiteral({ value: -1.0, kind: Kind.FLOAT })).toThrow(/Value is not a positive number/);
});

test('PositiveFloat - less than zero as string - serialize', () => {
  expect(() => PositiveFloat.serialize('-1.0')).toThrow(/Value is not a positive number/);
});

test('PositiveFloat - less than zero as string - parseValue', () => {
  expect(() => PositiveFloat.parseValue('-1.0')).toThrow(/Value is not a positive number/);
});

test('PositiveFloat - less than zero as string - parseLiteral', () => {
  expect(() => PositiveFloat.parseLiteral({ value: '-1.0', kind: Kind.FLOAT })).toThrow(/Value is not a positive number/);
});


// Not a number
test('PositiveFloat - not a number - serialize', () => {
  expect(() => PositiveFloat.serialize('not a number')).toThrow(/Value is not a number/);
});

test('PositiveFloat - not a number - parseValue', () => {
  expect(() => PositiveFloat.parseValue('not a number')).toThrow(/Value is not a number/);
});

test('PositiveFloat - not a number - parseLiteral', () => {
  expect(() => PositiveFloat.parseLiteral({ value: 'not a number', kind: Kind.STRING })).toThrow(/Can only validate floating point numbers as positive floating point numbers but got a/);
});
