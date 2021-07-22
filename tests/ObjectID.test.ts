/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { GraphQLObjectID } from '../src/scalars/ObjectID';
import { ObjectId } from 'bson';

describe('ObjectId', () => {
  describe('valid', () => {
    test('serialize', () => {
      const id = new ObjectId('5e5677d71bdc2ae76344968c');

      expect(GraphQLObjectID.serialize(id)).toBe(id.toHexString());
    });

    test('parseValue', () => {
      const id = '5e5677d71bdc2ae76344968c';
      const parsed = GraphQLObjectID.parseValue(id);

      expect(parsed).toBeInstanceOf(ObjectId);
      expect(parsed.toHexString()).toBe(id);
    });

    test('parseLiteral', () => {
      expect(
        GraphQLObjectID.parseLiteral(
          { value: '5e5677d71bdc2ae76344968c', kind: Kind.STRING },
          undefined,
        ), // undefined as prescribed by the Maybe<T> type
      ).toStrictEqual(new ObjectId('5e5677d71bdc2ae76344968c'));
    });
  });

  describe('invalid', () => {
    describe('not a mongodb object id', () => {
      test('serialize', () => {
        const invalid = '5e5677d71bdc2ae76344968z';
        expect(() => GraphQLObjectID.serialize(invalid)).toThrow(
          new RegExp(
            `Value is not a valid mongodb object id of form: ${invalid}`,
          ),
        );
      });

      test('parseValue', () => {
        const invalid = '5e5677d71bdc2ae76344968z';
        expect(() => GraphQLObjectID.parseValue(invalid)).toThrow(
          new RegExp(
            `Value is not a valid mongodb object id of form: ${invalid}`,
          ),
        );
      });

      test('parseLiteral', () => {
        const invalid = '5e5677d71bdc2ae76344968z';
        expect(
          () =>
            GraphQLObjectID.parseLiteral(
              { value: invalid, kind: Kind.STRING },
              undefined,
            ), // undefined as prescribed by the Maybe<T> type
        ).toThrow(
          new RegExp(
            `Value is not a valid mongodb object id of form: ${invalid}`,
          ),
        );
      });
    });

    describe('too short', () => {
      test('serialize', () => {
        const invalid = '5e5677d71bdc2ae';
        expect(() => GraphQLObjectID.serialize(invalid)).toThrow(
          new RegExp(
            `Value is not a valid mongodb object id of form: ${invalid}`,
          ),
        );
      });

      test('parseValue', () => {
        const invalid = '5e5677d71bdc2ae';
        expect(() => GraphQLObjectID.parseValue(invalid)).toThrow(
          new RegExp(
            `Value is not a valid mongodb object id of form: ${invalid}`,
          ),
        );
      });

      test('parseLiteral', () => {
        const invalid = '5e5677d71bdc2ae';
        expect(
          () =>
            GraphQLObjectID.parseLiteral(
              { value: invalid, kind: Kind.STRING },
              undefined,
            ), // undefined as prescribed by the Maybe<T> type
        ).toThrow(
          new RegExp(
            `Value is not a valid mongodb object id of form: ${invalid}`,
          ),
        );
      });
    });

    describe('too long', () => {
      test('serialize', () => {
        const invalid = '5e5677d71bdc2ae76344968c5';
        expect(() => GraphQLObjectID.serialize(invalid)).toThrow(
          new RegExp(
            `Value is not a valid mongodb object id of form: ${invalid}`,
          ),
        );
      });

      test('parseValue', () => {
        const invalid = '5e5677d71bdc2ae76344968c5';
        expect(() => GraphQLObjectID.parseValue(invalid)).toThrow(
          new RegExp(
            `Value is not a valid mongodb object id of form: ${invalid}`,
          ),
        );
      });

      test('parseLiteral', () => {
        const invalid = '5e5677d71bdc2ae76344968c5';
        expect(
          () =>
            GraphQLObjectID.parseLiteral(
              { value: invalid, kind: Kind.STRING },
              undefined,
            ), // undefined as prescribed by the Maybe<T> type
        ).toThrow(
          new RegExp(
            `Value is not a valid mongodb object id of form: ${invalid}`,
          ),
        );
      });
    });
  });
});
