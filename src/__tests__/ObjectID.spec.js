/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { ObjectID } from '..';

describe('ObjectId', () => {
  describe('valid', () => {
    test('serialize', () => {
      expect(ObjectID.serialize('5e5677d71bdc2ae76344968c')).toBe('5e5677d71bdc2ae76344968c');
    });

    test('parseValue', () => {
      expect(ObjectID.parseValue('5e5677d71bdc2ae76344968c')).toBe('5e5677d71bdc2ae76344968c');
    });

    test('parseLiteral', () => {
      expect(
        ObjectID.parseLiteral({ value: '5e5677d71bdc2ae76344968c', kind: Kind.STRING }),
      ).toBe('5e5677d71bdc2ae76344968c');
    });
  });

  describe('invalid', () => {
    describe('not a mongodb object id', () => {
      test('serialize', () => {
        const invalid = '5e5677d71bdc2ae76344968z';
        expect(() => ObjectID.serialize(invalid)).toThrow(
          new RegExp(`Value is not a valid mongodb object id of form: ${invalid}`),
        );
      });

      test('parseValue', () => {
        const invalid = '5e5677d71bdc2ae76344968z';
        expect(() => ObjectID.parseValue(invalid)).toThrow(
          new RegExp(`Value is not a valid mongodb object id of form: ${invalid}`),
        );
      });

      test('parseLiteral', () => {
        const invalid = '5e5677d71bdc2ae76344968z';
        expect(() =>
          ObjectID.parseLiteral({ value: invalid, kind: Kind.STRING }),
        ).toThrow(new RegExp(`Value is not a valid mongodb object id of form: ${invalid}`));
      });
    });

    describe('not a string', () => {
      test('serialize', () => {
        expect(() => ObjectID.serialize(5677)).toThrow(/Value is not string/);
      });

      test('parseValue', () => {
        expect(() => ObjectID.parseValue(5677)).toThrow(/Value is not string/);
      });

      test('parseLiteral', () => {
        expect(() => ObjectID.parseLiteral({ value: 5677, kind: Kind.INT })).toThrow(
          /Can only validate strings as mongodb object id but got a/,
        );
      });
    });

    describe('too short', () => {
      test('serialize', () => {
        const invalid = '5e5677d71bdc2ae';
        expect(() => ObjectID.serialize(invalid)).toThrow(
          new RegExp(`Value is not a valid mongodb object id of form: ${invalid}`),
        );
      });

      test('parseValue', () => {
        const invalid = '5e5677d71bdc2ae';
        expect(() => ObjectID.parseValue(invalid)).toThrow(
          new RegExp(`Value is not a valid mongodb object id of form: ${invalid}`),
        );
      });

      test('parseLiteral', () => {
        const invalid = '5e5677d71bdc2ae';
        expect(() =>
          ObjectID.parseLiteral({ value: invalid, kind: Kind.STRING }),
        ).toThrow(new RegExp(`Value is not a valid mongodb object id of form: ${invalid}`));
      });
    });

    describe('too long', () => {
      test('serialize', () => {
        const invalid = '5e5677d71bdc2ae76344968c5';
        expect(() => ObjectID.serialize(invalid)).toThrow(
          new RegExp(`Value is not a valid mongodb object id of form: ${invalid}`),
        );
      });

      test('parseValue', () => {
        const invalid = '5e5677d71bdc2ae76344968c5';
        expect(() => ObjectID.parseValue(invalid)).toThrow(
          new RegExp(`Value is not a valid mongodb object id of form: ${invalid}`),
        );
      });

      test('parseLiteral', () => {
        const invalid = '5e5677d71bdc2ae76344968c5';
        expect(() =>
          ObjectID.parseLiteral({ value: invalid, kind: Kind.STRING }),
        ).toThrow(new RegExp(`Value is not a valid mongodb object id of form: ${invalid}`));
      });
    });
  });
});
