/* global describe, it, expect */
import { Kind } from 'graphql/language';
import MAC from '../src/resolvers/MAC';

// Taken from https://github.com/hapijs/joi/blob/master/test/types/string.js
const addresses = [
    `01:23:45:67:89:ab`,
    `01-23-45-67-89-ab`,
    `0123.4567.89ab`
];

describe(`MAC`, () => {
    describe(`valid`, () => {
        it(`serialize`, () => {
            for (const address of addresses) {
                expect(MAC.serialize(address)).toEqual(address);
            }
        });

        it(`parseValue`, () => {
            for (const address of addresses) {
                expect(MAC.parseValue(address)).toEqual(address);
            }
        });

        it(`parseLiteral`, () => {
            for (const address of addresses) {
                expect(
                    MAC.parseLiteral({
                        value: address,
                        kind: Kind.STRING
                    }, {})
                ).toEqual(address);
            }
        });
    });

    describe(`invalid`, () => {
        describe(`not a valid MAC address`, () => {
            it(`serialize`, () => {
                expect(() => MAC.serialize(123)).toThrow(/Value is not string/);
                expect(() => MAC.serialize(`this is not an mac address`)).toThrow(/Value is not a valid MAC address/);
            });

            it(`parseValue`, () => {
                expect(() => MAC.serialize(123)).toThrow(/Value is not string/);
                expect(() => MAC.parseValue(`this is not an mac address`)).toThrow(/Value is not a valid MAC address/);
            });

            it(`parseLiteral`, () => {
                expect(() => MAC.parseLiteral({ value: 123, kind: Kind.INT } as any, {}))
                    .toThrow(/Can only validate strings as MAC addresses but got a/);

                expect(() => MAC.parseLiteral({ value: `this is not an mac address`, kind: Kind.STRING }, {}))
                    .toThrow(/Value is not a valid MAC address/);
            });
        });
    });
});
