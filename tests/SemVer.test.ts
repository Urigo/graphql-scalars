/* global describe, it, expect */
import { Kind } from 'graphql/language';
import { GraphQLSemVer } from '../src/scalars/SemVer';

// Taken from https://regex101.com/r/vkijKf/1/
const validSemanticVersions = [
  '0.0.4',
  '1.2.3',
  '10.20.30',
  '1.1.2-prerelease+meta',
  '1.1.2+meta',
  '1.1.2+meta-valid',
  '1.0.0-alpha',
  '1.0.0-beta',
  '1.0.0-alpha.beta',
  '1.0.0-alpha.beta.1',
  '1.0.0-alpha.1',
  '1.0.0-alpha0.valid',
  '1.0.0-alpha.0valid',
  '1.0.0-alpha-a.b-c-somethinglong+build.1-aef.1-its-okay',
  '1.0.0-rc.1+build.1',
  '2.0.0-rc.1+build.123',
  '1.2.3-beta',
  '10.2.3-DEV-SNAPSHOT',
  '1.2.3-SNAPSHOT-123',
  '1.0.0',
  '2.0.0',
  '1.1.7',
  '2.0.0+build.1848',
  '2.0.1-alpha.1227',
  '1.0.0-alpha+beta',
  '1.2.3----RC-SNAPSHOT.12.9.1--.12+788',
  '1.2.3----R-S.12.9.1--.12+meta',
  '1.2.3----RC-SNAPSHOT.12.9.1--.12',
  '1.0.0+0.build.1-rc.10000aaa-kk-0.1',
  '99999999999999999999999.999999999999999999.99999999999999999',
  '1.0.0-0A.is.legal',
];

const invalidSemanticVersions = [
  '1',
  '1.2',
  '1.2.3-0123',
  '1.2.3-0123.0123',
  '1.1.2+.123',
  '+invalid',
  '-invalid',
  '-invalid+invalid',
  '-invalid.01',
  'alpha',
  'alpha.beta',
  'alpha.beta.1',
  'alpha.1',
  'alpha+beta',
  'alpha_beta',
  'alpha.',
  'alpha..',
  'beta',
  '1.0.0-alpha_beta',
  '-alpha.',
  '1.0.0-alpha..',
  '1.0.0-alpha..1',
  '1.0.0-alpha...1',
  '1.0.0-alpha....1',
  '1.0.0-alpha.....1',
  '1.0.0-alpha......1',
  '1.0.0-alpha.......1',
  '01.1.1',
  '1.01.1',
  '1.1.01',
  '1.2',
  '1.2.3.DEV',
  '1.2-SNAPSHOT',
  '1.2.31.2.3----RC-SNAPSHOT.12.09.1--..12+788',
  '1.2-RC-SNAPSHOT',
  '-1.0.3-gamma+b7718',
  '+justmeta',
  '9.8.7+meta+meta',
  '9.8.7-whatever+meta+meta',
  '99999999999999999999999.999999999999999999.99999999999999999----RC-SNAPSHOT.12.09.1--------------------------------..12',
];

describe(`SemVer`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      for (const version of validSemanticVersions) {
        expect(GraphQLSemVer.serialize(version)).toEqual(version);
      }
    });

    it(`parseValue`, () => {
      for (const version of validSemanticVersions) {
        expect(GraphQLSemVer.parseValue(version)).toEqual(version);
      }
    });

    it(`parseLiteral`, () => {
      for (const version of validSemanticVersions) {
        expect(
          GraphQLSemVer.parseLiteral(
            {
              value: version,
              kind: Kind.STRING,
            },
            {}
          )
        ).toEqual(version);
      }
    });
  });

  describe(`invalid`, () => {
    describe(`not a valid Semantic Version`, () => {
      it(`serialize`, () => {
        expect(() => GraphQLSemVer.serialize(123)).toThrow(/Value is not string/);
        expect(() => GraphQLSemVer.serialize(`this is not a Semantic Version`)).toThrow(
          /Value is not a valid Semantic Version/
        );

        for (const version of invalidSemanticVersions) {
          expect(() => GraphQLSemVer.serialize(version)).toThrow(/Value is not a valid Semantic Version/);
        }
      });

      it(`parseValue`, () => {
        expect(() => GraphQLSemVer.parseValue(123)).toThrow(/Value is not string/);
        expect(() => GraphQLSemVer.parseValue(`this is not a Semantic Version`)).toThrow(
          /Value is not a valid Semantic Version/
        );

        for (const version of invalidSemanticVersions) {
          expect(() => GraphQLSemVer.parseValue(version)).toThrow(/Value is not a valid Semantic Version/);
        }
      });

      it(`parseLiteral`, () => {
        expect(() => GraphQLSemVer.parseLiteral({ value: 123, kind: Kind.INT } as any, {})).toThrow(
          /Can only validate strings as Semantic Version but got a/
        );

        expect(() =>
          GraphQLSemVer.parseLiteral({ value: `this is not a Semantic Version`, kind: Kind.STRING }, {})
        ).toThrow(/Value is not a valid Semantic Version/);
      });
    });
  });
});
