/* global describe, it, expect */
import { Kind } from 'graphql/language';
import ISBN from '../src/resolvers/ISBN';

// Taken from https://github.com/hapijs/joi/blob/master/test/types/string.js
const serialNumbers = [
  `ISBN 1561616161`,
  `ISBN 1577677171`,
  `ISBN 978 787 78 78`,
  `ISBN 978 787 7878`,
  `ISBN 978-0615-856`,
  `ISBN 9790765335`,
  `ISBN 979076533X`,
  `ISBN: 978-0615-856`,
  `ISBN: 9780615856`,
  `ISBN 978 787 78 78788`,
  `ISBN 978-0615-856-73-5`,
  `ISBN 9790765335999`,
  `ISBN-13: 978-0615-856-73-5`,
  `ISBN-13: 978-0615856735`,
  `ISBN-13: 9780765335999`,
  `ISBN: 978-0615-856-73-5`,
  `ISBN: 9780615856735`
];

describe(`ISBN`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      for (const value of serialNumbers) {
        expect(ISBN.serialize(value)).toEqual(value);
      }
    });

    it(`parseValue`, () => {
      for (const value of serialNumbers) {
        expect(ISBN.parseValue(value)).toEqual(value);
      }
    });

    it(`parseLiteral`, () => {
      for (const value of serialNumbers) {
        expect(
          ISBN.parseLiteral({
            value,
            kind: Kind.STRING
          }, {})
        ).toEqual(value);
      }
    });
  });

  describe(`invalid`, () => {
    describe(`not a valid ISBN address`, () => {
      it(`serialize`, () => {
        expect(() => ISBN.serialize(123)).toThrow(/Value is not string/);
        expect(() => ISBN.serialize(`this is not an ISBN number`)).toThrow(/Value is not a valid ISBN number/);
      });

      it(`parseValue`, () => {
        expect(() => ISBN.serialize(123)).toThrow(/Value is not string/);
        expect(() => ISBN.parseValue(`this is not an ISBN number`)).toThrow(/Value is not a valid ISBN number/);
      });

      it(`parseLiteral`, () => {
        expect(() => ISBN.parseLiteral({ value: 123, kind: Kind.INT } as any, {}))
          .toThrow(/Can only validate strings as ISBN numbers but got a/);

        expect(() => ISBN.parseLiteral({ value: `this is not an ISBN number`, kind: Kind.STRING }, {}))
          .toThrow(/Value is not a valid ISBN number/);
      });
    });
  });
});
