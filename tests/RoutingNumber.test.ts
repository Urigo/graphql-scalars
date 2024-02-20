import { Kind } from 'graphql';
import { GraphQLRoutingNumber } from '../src/scalars/RoutingNumber.js';

const invalids: [string, string | number, RegExp][] = [
  ['less than 9 digits', '11100009', /must have nine digits/],
  ['greater than 9 digits', '1110000250', /must have nine digits/],
  ["checksum doesn't match", '111000024', /checksum doesn't match/],
  ["all 1's", '111111111', /checksum doesn't match/],
  ['special character', '11100002$', /must have nine digits/],
  ['alphabetic character', '11100002a', /must have nine digits/],
  ['negative number', -111000025, /must have nine digits/],
];

const valids: (string | number)[] = ['111000025', 111000025, '031001175', '021000021'];

describe('ABA Routing Number', () => {
  describe('invalid', () => {
    test("type isn't String or Integer", () => {
      const value = 102.3;

      expect(() =>
        GraphQLRoutingNumber.parseLiteral({
          kind: Kind.FLOAT,
          value: '' + value,
        }),
      ).toThrow(/can only parse Integer or String/);

      expect(() => GraphQLRoutingNumber.serialize(value)).toThrow(/must be integer or string/);

      expect(() => GraphQLRoutingNumber.parseValue(value)).toThrow(/must be integer or string/);
    });

    test.each(invalids)(`%s`, (_, routingNumber, reason) => {
      expect(() =>
        GraphQLRoutingNumber.parseLiteral({
          kind: typeof routingNumber === 'string' ? Kind.STRING : Kind.INT,
          value: '' + routingNumber,
        }),
      ).toThrow(reason);

      expect(() => GraphQLRoutingNumber.parseValue(routingNumber)).toThrow(reason);

      expect(() => GraphQLRoutingNumber.serialize(routingNumber)).toThrow(reason);
    });
  });

  describe('valid', () => {
    test.each(valids)('scalar: %s', routing => {
      const parsed = '' + routing;
      expect(GraphQLRoutingNumber.parseValue(routing)).toBe(parsed);
      expect(GraphQLRoutingNumber.serialize(routing)).toBe(parsed);
      expect(
        GraphQLRoutingNumber.parseLiteral({
          kind: Kind.STRING,
          value: '' + routing,
        }),
      ).toBe(parsed);
    });
  });
});
