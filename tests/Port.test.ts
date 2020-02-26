/* global describe, it, expect */
import { Kind } from 'graphql/language';
import Port from '../src/resolvers/Port';

describe(`Port`, () => {
    describe(`valid`, () => {
        describe(`as int`, () => {
            it(`serialize`, () => {
                expect(Port.serialize(1337)).toBe(1337);
            });

            it(`parseValue`, () => {
                expect(Port.parseValue(1337)).toBe(1337);
            });

            it(`parseLiteral`, () => {
                expect(Port.parseLiteral({ value: 1337, kind: Kind.INT } as any, {})).toBe(1337);
            });
        });

        describe(`as string`, () => {
            it(`serialize`, () => {
                expect(Port.serialize(`1337`)).toBe(1337);
            });

            it(`parseValue`, () => {
                expect(Port.parseValue(`1337`)).toBe(1337);
            });

            it(`parseLiteral`, () => {
                expect(Port.parseLiteral({ value: `1337`, kind: Kind.INT } as any, {})).toBe(1337);
            });
        });
    });

    describe(`invalid`, () => {
        describe(`negative`, () => {
            it(`serialize`, () => {
                expect(() => Port.serialize(-1)).toThrow(/Value is not a valid TCP port: -1/);
            });

            it(`parseValue`, () => {
                expect(() => Port.parseValue(-1)).toThrow(/Value is not a valid TCP port/);
            });

            it(`parseLiteral`, () => {
                expect(() => Port.parseLiteral({ value: -1, kind: Kind.INT } as any, {})).toThrow(/Value is not a valid TCP port: -1/);
            });
        });

        describe(`out of range`, () => {
            it(`serialize`, () => {
                expect(() => Port.serialize(65536)).toThrow(/Value is not a valid TCP port: 65536/);
            });

            it(`parseValue`, () => {
                expect(() => Port.parseValue(65536)).toThrow(/Value is not a valid TCP port/);
            });

            it(`parseLiteral`, () => {
                expect(() => Port.parseLiteral({ value: 65536, kind: Kind.INT } as any, {})).toThrow(/Value is not a valid TCP port: 65536/);
            });
        });

        describe(`null`, () => {
            it(`serialize`, () => {
                expect(() => Port.serialize(null)).toThrow(/Value is not a number: null/);
            });

            it(`parseValue`, () => {
                expect(() => Port.parseValue(null)).toThrow(/Value is not a number/);
            });

            it(`parseLiteral`, () => {
                expect(() => Port.parseLiteral({ value: null, kind: Kind.INT } as any, {})).toThrow(/Value is not a number: null/);
            });
        });

        describe(`undefined`, () => {
            it(`serialize`, () => {
                expect(() => Port.serialize(undefined)).toThrow(/Value is not a number: undefined/); // eslint-disable-line
            });

            it(`parseValue`, () => {
                expect(() => Port.parseValue(undefined)).toThrow(/Value is not a number/); // eslint-disable-line
            });

            it(`parseLiteral`, () => {
                expect(() => Port.parseLiteral({ value: undefined, kind: Kind.INT } as any, {})).toThrow( // eslint-disable-line
                    /Value is not a number: undefined/
                );
            });
        });

        describe(`infinity`, () => {
            it(`serialize`, () => {
                expect(() => Port.serialize(Number.POSITIVE_INFINITY)).toThrow(/Value is not a finite number/);
            });

            it(`parseValue`, () => {
                expect(() => Port.parseValue(Number.POSITIVE_INFINITY)).toThrow(/Value is not a finite number/);
            });

            it(`parseLiteral`, () => {
                expect(() =>
                    Port.parseLiteral({
                        value: Number.POSITIVE_INFINITY,
                        kind: Kind.INT
                    } as any, {})).toThrow(/Value is not a finite number/);
            });
        });

        describe(`not a number`, () => {
            it(`serialize`, () => {
                expect(() => Port.serialize(`not a number`)).toThrow(/Value is not a number/);
            });

            it(`parseValue`, () => {
                expect(() => Port.parseValue(`not a number`)).toThrow(/Value is not a number/);
            });

            it(`parseLiteral`, () => {
                expect(() =>
                    Port.parseLiteral({
                        value: `not a number`,
                        kind: Kind.STRING
                    }, {})).toThrow(/Can only validate integers as TCP ports but got a/);
            });
        });

        describe(`NaN`, () => {
            it(`serialize`, () => {
                expect(() => Port.serialize(Number.NaN)).toThrow(/Value is not a number/);
            });

            it(`parseValue`, () => {
                expect(() => Port.parseValue(Number.NaN)).toThrow(/Value is not a number/);
            });

            it(`parseLiteral`, () => {
                expect(() => Port.parseLiteral({ value: Number.NaN, kind: Kind.STRING } as any, {})).toThrow(
                    /Can only validate integers as TCP ports but got a/
                );
            });
        });
    });
});
