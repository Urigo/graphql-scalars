/* global jest, describe, test, expect */

import { Kind } from 'graphql/language';
import { RegularExpression } from '../src/RegularExpression';

describe('RegularExpression', () => {
  const GraphQLAbc = new RegularExpression('Abc', /^abc$/);

  describe('valid', () => {
    test('serialize', () => {
      expect(GraphQLAbc.serialize('abc')).toBe('abc');
    });

    test('parseValue', () => {
      expect(GraphQLAbc.parseValue('abc')).toBe('abc');
    });

    test('parseLiteral', () => {
      expect(
        GraphQLAbc.parseLiteral({ value: 'abc', kind: Kind.STRING }, {}),
      ).toBe('abc');
    });
  });

  describe('invalid', () => {
    describe('does not match', () => {
      test('serialize', () => {
        expect(() => GraphQLAbc.serialize('this does not match')).toThrow(
          /Value does not match the regular expression/,
        );
      });

      test('parseValue', () => {
        expect(() => GraphQLAbc.parseValue('this does not match')).toThrow(
          /Value does not match the regular expression/,
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          GraphQLAbc.parseLiteral(
            { value: 'this does not match', kind: Kind.STRING },
            {},
          ),
        ).toThrow(/Value does not match the regular expression/);
      });
    });

    describe('does not match (w/options)', () => {
      const errorMessageFn = (regex: RegExp, value: string) =>
        `This is a custom error message ${regex}: ${value}`;

      test('serialize', () => {
        const errorMessage = jest.fn(errorMessageFn);
        const GraphQLAbcWithOptions = new RegularExpression('Abc', /^abc$/, {
          errorMessage,
        });

        expect(() =>
          GraphQLAbcWithOptions.serialize('this does not match'),
        ).toThrow(/This is a custom error message/);
        expect(errorMessage.mock.calls.length).toBe(1);
        expect(errorMessage.mock.calls[0][0]).toEqual(/^abc$/);
        expect(errorMessage.mock.calls[0][1]).toEqual('this does not match');
      });

      test('parseValue', () => {
        const errorMessage = jest.fn(errorMessageFn);
        const GraphQLAbcWithOptions = new RegularExpression('Abc', /^abc$/, {
          errorMessage,
        });

        expect(() =>
          GraphQLAbcWithOptions.parseValue('this does not match'),
        ).toThrow(/This is a custom error message/);
        expect(errorMessage.mock.calls.length).toBe(1);
        expect(errorMessage.mock.calls[0][0]).toEqual(/^abc$/);
        expect(errorMessage.mock.calls[0][1]).toEqual('this does not match');
      });

      test('parseLiteral', () => {
        const errorMessage = jest.fn(errorMessageFn);
        const AbcWithOptions = new RegularExpression('Abc', /^abc$/, {
          errorMessage,
        });

        expect(() =>
          AbcWithOptions.parseLiteral(
            {
              value: 'this does not match',
              kind: Kind.STRING,
            },
            {},
          ),
        ).toThrow(/This is a custom error message/);
        expect(errorMessage.mock.calls.length).toBe(1);
        expect(errorMessage.mock.calls[0][0]).toEqual(/^abc$/);
        expect(errorMessage.mock.calls[0][1]).toEqual('this does not match');
      });
    });

    describe('not a string', () => {
      test('serialize', () => {
        expect(() => GraphQLAbc.serialize(123)).toThrow(/Value is not string/);
      });

      test('parseValue', () => {
        expect(() => GraphQLAbc.parseValue(123)).toThrow(/Value is not string/);
      });

      test('parseLiteral', () => {
        expect(() =>
          GraphQLAbc.parseLiteral({ value: '123', kind: Kind.INT }, {}),
        ).toThrow(/Can only validate strings as regular expressions but got a/);
      });
    });
  });
});
