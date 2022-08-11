import { GraphQLAccountNumber } from '../src/scalars/AccountNumber';
import { Kind } from 'graphql';

const invalids = [
  ['greather than 17', '123456789123456789'],
  ['less than 5', '1234'],
  ['special character', '1234a$'],
  ['special character', '12345_'],
];

const valids: string[] = ['01234', 'a1234', '12345678912345678'];

describe('ABA Routing Number', () => {
  describe('invalid', () => {
    test("type isn't String", () => {
      const value = 102;

      expect(() =>
        GraphQLAccountNumber.parseLiteral({
          kind: Kind.INT,
          value: '' + value,
        })
      ).toThrow(/can only parse String/);

      expect(() => GraphQLAccountNumber.serialize(value)).toThrow(/can only parse String/);

      expect(() => GraphQLAccountNumber.parseValue(value)).toThrow(/can only parse String/);
    });

    test.each(invalids)(`%s`, (_, routingNumber) => {
      expect(() =>
        GraphQLAccountNumber.parseLiteral({
          kind: Kind.STRING,
          value: routingNumber,
        })
      ).toThrow(/must be alphanumeric between 5-17/);

      expect(() => GraphQLAccountNumber.parseValue(routingNumber)).toThrow(/must be alphanumeric between 5-17/);

      expect(() => GraphQLAccountNumber.serialize(routingNumber)).toThrow(/must be alphanumeric between 5-17/);
    });
  });

  describe('valid', () => {
    test.each(valids)('scalar: %s', routing => {
      expect(GraphQLAccountNumber.parseValue(routing)).toBe(routing);
      expect(GraphQLAccountNumber.serialize(routing)).toBe(routing);
      expect(
        GraphQLAccountNumber.parseLiteral({
          kind: Kind.STRING,
          value: routing,
        })
      ).toBe(routing);
    });
  });
});
