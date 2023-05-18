import { Kind } from 'graphql';
import { GraphQLLocalDateTime } from '../src';

const VALID_LOCAL_DATE_TIMES = [
  '2016-02-01T00:00:15Z',
  '2016-02-01T00:00:00-11:00',
  '2017-01-07T11:25:00+01:00',
  '2017-01-07T00:00:00+01:20',
  '2016-02-01T00:00:00.1Z',
  '2016-02-01T00:00:00.000Z',
  '2016-02-01T00:00:00.990Z',
  '2016-02-01T00:00:00.23498Z',
  '2017-01-07T11:25:00.450+01:00',
  '2016-02-01t00:00:00.000z',
];

describe(`LocalDateTime`, () => {
  describe('valid', () => {
    it('serialize', () => {
      VALID_LOCAL_DATE_TIMES.forEach(value => {
        expect(GraphQLLocalDateTime.serialize(value)).toEqual(value);
      });
    });

    it('parseValue', () => {
      VALID_LOCAL_DATE_TIMES.forEach(value => {
        expect(GraphQLLocalDateTime.parseValue(value)).toEqual(value);
      });
    });

    it('parseLiteral', () => {
      VALID_LOCAL_DATE_TIMES.forEach(value => {
        expect(
          GraphQLLocalDateTime.parseLiteral(
            {
              value,
              kind: Kind.STRING,
            },
            {},
          ),
        ).toEqual(value);
      });
    });
  });
  describe('invalid', () => {
    describe('not string', () => {
      it('serialize', () => {
        expect(() => GraphQLLocalDateTime.serialize(123)).toThrow(/Value is not string/);
        expect(() => GraphQLLocalDateTime.serialize(false)).toThrow(/Value is not string/);
      });
      it('parseValue', () => {
        expect(() => GraphQLLocalDateTime.parseValue(123)).toThrow(/Value is not string/);
        expect(() => GraphQLLocalDateTime.parseValue(false)).toThrow(/Value is not string/);
      });
      it('parseLiteral', () => {
        expect(() =>
          GraphQLLocalDateTime.parseLiteral({ value: 123 as any, kind: Kind.INT }, {}),
        ).toThrow(/Can only validate strings as local date-times but got a: IntValue/);
        expect(() =>
          GraphQLLocalDateTime.parseLiteral({ value: false, kind: Kind.BOOLEAN }, {}),
        ).toThrow(/Can only validate strings as local date-times but got a: BooleanValue/);
      });
    });
    describe('not a valid local date time string', () => {
      const invalidDateTime = '2015-02-24T00:00:00.000+0100';
      it('serialize', () => {
        expect(() => GraphQLLocalDateTime.serialize(invalidDateTime)).toThrow(
          /LocalDateTime cannot represent an invalid local date-time-string/,
        );
      });
      it('parseValue', () => {
        expect(() => GraphQLLocalDateTime.parseValue(invalidDateTime)).toThrow(
          /LocalDateTime cannot represent an invalid local date-time-string/,
        );
      });
      it('parseLiteral', () => {
        expect(() =>
          GraphQLLocalDateTime.parseLiteral({ value: invalidDateTime, kind: Kind.STRING }, {}),
        ).toThrow(/LocalDateTime cannot represent an invalid local date-time-string/);
      });
    });
    describe('invalid date', () => {
      const invalidDateTime = '2017-13-46T11:25:00.450+01:00';
      it('serialize', () => {
        expect(() => GraphQLLocalDateTime.serialize(invalidDateTime)).toThrow(
          /Value is not a valid LocalDateTime/,
        );
      });
      it('parseValue', () => {
        expect(() => GraphQLLocalDateTime.parseValue(invalidDateTime)).toThrow(
          /Value is not a valid LocalDateTime/,
        );
      });
      it('parseLiteral', () => {
        expect(() =>
          GraphQLLocalDateTime.parseLiteral({ value: invalidDateTime, kind: Kind.STRING }, {}),
        ).toThrow(/Value is not a valid LocalDateTime/);
      });
    });
  });
});
