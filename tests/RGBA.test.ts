/* global describe, it, expect */
import { Kind } from 'graphql/language';
import RGBA from '../src/resolvers/RGBA';

describe(`RGBA`, () => {
    describe(`valid`, () => {
        it(`serialize`, () => {
            expect(RGBA.serialize(`rgba(51, 170, 51, .7)`)).toEqual(`rgba(51, 170, 51, .7)`);
        });

        it(`parseValue`, () => {
            expect(RGBA.parseValue(`rgba(51, 170, 51, .7)`)).toEqual(`rgba(51, 170, 51, .7)`);
        });

        it(`parseLiteral`, () => {
            expect(
                RGBA.parseLiteral({
                    value: `rgba(51, 170, 51, .7)`,
                    kind: Kind.STRING
                }, {})
            ).toEqual(`rgba(51, 170, 51, .7)`);
        });
    });

    describe(`invalid`, () => {
        describe(`not a valid RGBA color`, () => {
            it(`serialize`, () => {
                expect(() => RGBA.serialize(123)).toThrow(/Value is not string/);
                expect(() => RGBA.serialize(`this is not an rgba color`)).toThrow(/Value is not a valid RGBA color/);
            });

            it(`parseValue`, () => {
                expect(() => RGBA.serialize(123)).toThrow(/Value is not string/);
                expect(() => RGBA.parseValue(`this is not an rgba color`)).toThrow(/Value is not a valid RGBA color/);
            });

            it(`parseLiteral`, () => {
                expect(() => RGBA.parseLiteral({ value: 123, kind: Kind.INT } as any, {}))
                    .toThrow(/Can only validate strings as RGBA colors but got a/);

                expect(() => RGBA.parseLiteral({ value: `this is not an rgba color`, kind: Kind.STRING }, {}))
                    .toThrow(/Value is not a valid RGBA color/);
            });
        });
    });
});
