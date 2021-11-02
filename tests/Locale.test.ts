import { GraphQLError, Kind } from 'graphql';
import { GraphQLLocale } from '../src/scalars/Locale';

describe('GraphQLLocale', () => {
  const locales = ['zh-CN', 'en', 'en-US', 'EN-US', 'en-us'];
  const invalidLocales = ['unknown', 'cn-ZH', 'fr_CA', '🇨🇳'];

  describe.each(locales)('valid locales', (locale: string) => {
    it(`${locale} works on serialize`, async () =>
      expect(GraphQLLocale.serialize(locale)).toBe(locale));
    it(`${locale} works on parseValue`, async () =>
      expect(GraphQLLocale.parseValue(locale)).toBe(locale));
    it(`${locale} works on parseLiteral`, async () =>
      expect(
        GraphQLLocale.parseLiteral({ kind: Kind.STRING, value: locale }, null),
      ).toBe(locale));
  });

  describe.each(invalidLocales)('invalid locales', (locale: string) => {
    it(`${locale} throws on serialize`, async () =>
      expect(() => GraphQLLocale.serialize(locale)).toThrow(TypeError));
    it(`${locale} throws on parseValue`, async () =>
      expect(() => GraphQLLocale.parseValue(locale)).toThrow(TypeError));
    it(`${locale} throws on parseLiteral`, async () =>
      expect(() =>
        GraphQLLocale.parseLiteral({ kind: Kind.STRING, value: locale }, null),
      ).toThrow(TypeError));
  });

  it('throws an error on other kind', () =>
    expect(() =>
      GraphQLLocale.parseLiteral({ kind: Kind.INT, value: '1234' }, null),
    ).toThrow(GraphQLError));
});
