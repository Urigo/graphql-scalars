import { Kind } from 'graphql';
import { GraphQLLocalDate } from '../src/scalars/LocalDate';

const VALID_LOCAL_DATES = [
  '2020-01-01',
  '2020-12-31',
  '2020-02-29', // leap day in a leap year
];

const INVALID_LOCAL_DATES = [
  'this is not a valid date',
  '2020',
  '01-01',
  '2021-02-29', // leap day in a non-leap year
  '2020-02-30',
  '2020-13-01',
  '2020-01-32',
  '2020-09-12T13:08:47', // a valid ISO 8601 value, but times aren't allowed in the LocalDate scalar
];

describe(`LocalDate`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      VALID_LOCAL_DATES.forEach(date => {
        expect(GraphQLLocalDate.serialize(date)).toEqual(date);
      });
    });

    it(`parseValue`, () => {
      VALID_LOCAL_DATES.forEach(date => {
        expect(GraphQLLocalDate.parseValue(date)).toEqual(date);
      });
    });

    it(`parseLiteral`, () => {
      VALID_LOCAL_DATES.forEach(testValue => {
        expect(
          GraphQLLocalDate.parseLiteral(
            {
              value: testValue,
              kind: Kind.STRING,
            },
            {},
          ),
        ).toEqual(testValue);
      });
    });
  });

  describe(`invalid`, () => {
    describe(`not a valid LocalDate`, () => {
      it(`serialize`, () => {
        expect(() => GraphQLLocalDate.serialize(123)).toThrow(/Value is not string/);

        expect(() => GraphQLLocalDate.serialize(false)).toThrow(/Value is not string/);
        INVALID_LOCAL_DATES.forEach(testValue => {
          expect(() => GraphQLLocalDate.serialize(testValue)).toThrow(
            /Value is not a valid LocalDate/,
          );
        });
      });

      it(`parseValue`, () => {
        expect(() => GraphQLLocalDate.parseValue(123)).toThrow(/Value is not string/);

        expect(() => GraphQLLocalDate.parseValue(false)).toThrow(/Value is not string/);
        INVALID_LOCAL_DATES.forEach(date => {
          expect(() => GraphQLLocalDate.parseValue(date)).toThrow(/Value is not a valid LocalDate/);
        });
      });

      it(`parseLiteral`, () => {
        expect(() =>
          GraphQLLocalDate.parseLiteral({ value: 123 as any, kind: Kind.INT }, {}),
        ).toThrow(/Can only validate strings as local dates but got a/);

        expect(() =>
          GraphQLLocalDate.parseLiteral({ value: false, kind: Kind.BOOLEAN }, {}),
        ).toThrow(/Can only validate strings as local dates but got a/);
        INVALID_LOCAL_DATES.forEach(testValue => {
          expect(() =>
            GraphQLLocalDate.parseLiteral({ value: testValue, kind: Kind.STRING }, {}),
          ).toThrow(/Value is not a valid LocalDate/);
        });
      });
    });
  });
});
