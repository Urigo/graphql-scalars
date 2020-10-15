import { Kind } from 'graphql/language';
import { GraphQLLocalTime } from '../src/scalars/LocalTime';

const VALID_TIMES = [
  '00:00',
  '00:00:00',
  '00:00:00.000',
  '23:59',
  '23:59:59',
  '23:59:59.999',
  '24:00',
  '24:00:00',
  '24:00:00.000',
  '12:30',
  '12:30:45',
  '12:30:45.678',
];

const INVALID_TIMES = [
  'this is not a valid time',
  '24:01',
  '24:00:01',
  '24:00:00.001',
  '99:99:99',
  '00:00:00+01:30',
  '10:00:11.003Z',
];

describe(`LocalTime`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      VALID_TIMES.forEach((testValue) => {
        expect(GraphQLLocalTime.serialize(testValue)).toEqual(testValue);
      });
    });

    it(`parseValue`, () => {
      VALID_TIMES.forEach((testValue) => {
        expect(GraphQLLocalTime.parseValue(testValue)).toEqual(testValue);
      });
    });

    it(`parseLiteral`, () => {
      VALID_TIMES.forEach((testValue) => {
        expect(
          GraphQLLocalTime.parseLiteral(
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
    describe(`not a valid LocalTime`, () => {
      it(`serialize`, () => {
        expect(() => GraphQLLocalTime.serialize(123)).toThrow(
          /Value is not string/,
        );

        expect(() => GraphQLLocalTime.serialize(false)).toThrow(
          /Value is not string/,
        );
        INVALID_TIMES.forEach((testValue) => {
          expect(() => GraphQLLocalTime.serialize(testValue)).toThrow(
            /Value is not a valid LocalTime/,
          );
        });
      });

      it(`parseValue`, () => {
        expect(() => GraphQLLocalTime.parseValue(123)).toThrow(
          /Value is not string/,
        );

        expect(() => GraphQLLocalTime.parseValue(false)).toThrow(
          /Value is not string/,
        );
        INVALID_TIMES.forEach((testValue) => {
          expect(() => GraphQLLocalTime.parseValue(testValue)).toThrow(
            /Value is not a valid LocalTime/,
          );
        });
      });

      it(`parseLiteral`, () => {
        expect(() =>
          GraphQLLocalTime.parseLiteral(
            { value: 123, kind: Kind.INT } as any,
            {},
          ),
        ).toThrow(/Can only validate strings as local times but got a/);

        expect(() =>
          GraphQLLocalTime.parseLiteral(
            { value: false, kind: Kind.BOOLEAN },
            {},
          ),
        ).toThrow(/Can only validate strings as local times but got a/);
        INVALID_TIMES.forEach((testValue) => {
          expect(() =>
            GraphQLLocalTime.parseLiteral(
              { value: testValue, kind: Kind.STRING },
              {},
            ),
          ).toThrow(/Value is not a valid LocalTime/);
        });
      });
    });
  });
});
