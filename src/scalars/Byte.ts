import {
  ASTNode,
  GraphQLScalarType,
  IntValueNode,
  Kind,
  ObjectValueNode,
  print,
} from 'graphql';

type BufferJson = { type: 'Buffer'; data: number[] };
const IS_HEX_FLAG = 'hex';
const IS_BASE64_FLAG = 'b64';

function validate(value: Buffer | string | BufferJson) {
  if (typeof value !== 'string' && !(value instanceof global.Buffer)) {
    throw new TypeError(
      `Value is not an instance of Buffer: ${JSON.stringify(value)}`,
    );
  }
  if (typeof value === 'string') {
    const type = value.slice(0, 3);
    const isBase64 = type === IS_BASE64_FLAG;
    const isHex = type === IS_HEX_FLAG;
    if (!isBase64 && !isHex) {
      throw new TypeError(
        `Value is not a valid base64 or hex encoded string: ${JSON.stringify(
          value,
        )}`,
      );
    }
    return global.Buffer.from(value.slice(3), isHex ? 'hex' : 'base64');
  }

  return value;
}

function parseObject(ast: ObjectValueNode) {
  const key = ast.fields[0].value;
  const value = ast.fields[1].value;
  if (
    ast.fields.length === 2 &&
    key.kind === Kind.STRING &&
    key.value === 'Buffer' &&
    value.kind === Kind.LIST
  ) {
    return global.Buffer.from(
      value.values.map((astValue: IntValueNode) => parseInt(astValue.value)),
    );
  }
  throw new TypeError(
    `Value is not a JSON representation of Buffer: ${print(ast)}`,
  );
}

export const GraphQLByte = /*#__PURE__*/ new GraphQLScalarType({
  name: 'Byte',
  description: 'The `Byte` scalar type represents byte value as a Buffer',
  serialize: validate,
  parseValue: validate,
  parseLiteral(ast: ASTNode) {
    switch (ast.kind) {
      case Kind.STRING:
        return validate(ast.value);
      case Kind.OBJECT:
        return parseObject(ast);
      default:
        throw new TypeError(
          `Can only parse base64 or hex encoded strings as Byte, but got a: ${ast.kind}`,
        );
    }
  },
});
