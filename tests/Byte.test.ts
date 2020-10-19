/* global describe, test, expect */

import { Kind, ValueNode } from 'graphql/language';
import { GraphQLByte } from '../src/scalars/Byte';

const byte = Buffer.from([
  68,
  111,
  100,
  103,
  101,
  114,
  115,
  32,
  82,
  117,
  108,
  101,
  33,
]);
const base64String = 'b64' + byte.toString('base64');
const hexString = 'hex' + byte.toString('hex');
const notBase64 = byte.toString('base64');
const notHex = byte.toString('hex');
const notByte = 1;

function createBufferObject(type: string, values: ValueNode[]) {
  return {
    fields: [
      {
        kind: Kind.OBJECT_FIELD,
        name: {
          kind: Kind.NAME,
          value: 'type',
        },
        value: {
          kind: Kind.STRING,
          value: type,
        },
      },
      {
        kind: Kind.OBJECT_FIELD,
        name: {
          kind: Kind.NAME,
          value: 'data',
        },
        value: {
          kind: Kind.LIST,
          values,
        },
      },
    ],
    kind: Kind.OBJECT,
  };
}

describe.each<[string, Buffer | string, string | number]>([
  ['Buffer', byte, notByte],
  ['Base64 String', base64String, notBase64],
  ['Hex String', hexString, notHex],
])('Byte', (testType, value, notValue) => {
  describe('valid', () => {
    test(`serialize (${testType})`, () => {
      expect(GraphQLByte.serialize(value)).toEqual(byte);
    });

    test(`parseValue (${testType})`, () => {
      expect(GraphQLByte.parseValue(value)).toEqual(byte);
    });

    test(`parseLiteral (${testType})`, () => {
      if (typeof value === 'string') {
        expect(
          GraphQLByte.parseLiteral(
            {
              value,
              kind: Kind.STRING,
            },
            {},
          ),
        ).toEqual(byte);
      } else {
        const bufferJson = value.toJSON();
        expect(
          GraphQLByte.parseLiteral(
            createBufferObject(
              'Buffer',
              bufferJson.data.map((value) => ({
                kind: Kind.INT,
                value: value.toString(),
              })),
            ),
            {},
          ),
        ).toEqual(byte);
      }
    });
  });

  describe('invalid', () => {
    test('serialize', () => {
      expect(() => GraphQLByte.serialize(notValue)).toThrow(/Value is not/);
    });

    test('parseValue', () => {
      expect(() => GraphQLByte.parseValue(notValue)).toThrow(/Value is not/);
    });

    test(`parseLiteral (${testType})`, () => {
      if (typeof notValue === 'string') {
        expect(() =>
          GraphQLByte.parseLiteral(
            {
              value: notValue,
              kind: Kind.INT,
            },
            {},
          ),
        ).toThrow(/Can only parse/);
      } else {
        expect(() => {
          GraphQLByte.parseLiteral(createBufferObject('Path', []), {});
        }).toThrow(/Value is not a JSON representation of Buffer/);
      }
    });
  });
});
