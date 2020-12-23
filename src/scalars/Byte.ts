import {
  ASTNode,
  GraphQLScalarType,
  IntValueNode,
  Kind,
  ObjectValueNode,
  print,
} from 'graphql';

type BufferJson = { type: 'Buffer'; data: number[] };
const base64Validator = /^(?:[A-Za-z0-9+]{4})*(?:[A-Za-z0-9+]{2}==|[A-Za-z0-9+]{3}=)?$/;
function hexValidator(value: string) {
  // For larger strings, we run into issues with MAX_SAFE_INTEGER, so split the string
  // into smaller pieces to avoid this issue.
  if (value.length > 8) {
    let parsedString = '';
    for (
      let startIndex = 0, endIndex = 8;
      startIndex < value.length;
      startIndex += 8, endIndex += 8
    ) {
      parsedString += parseInt(value.slice(startIndex, endIndex), 16).toString(
        16,
      );
    }
    return parsedString === value;
  }
  return parseInt(value, 16).toString(16) === value;
}

function validate(value: Buffer | string | BufferJson) {
  if (typeof value !== 'string' && !(value instanceof global.Buffer)) {
    throw new TypeError(
      `Value is not an instance of Buffer: ${JSON.stringify(value)}`,
    );
  }
  if (typeof value === 'string') {
    const isBase64 = base64Validator.test(value);
    const isHex = hexValidator(value);
    if (!isBase64 && !isHex) {
      throw new TypeError(
        `Value is not a valid base64 or hex encoded string: ${JSON.stringify(
          value,
        )}`,
      );
    }
    return global.Buffer.from(value, isHex ? 'hex' : 'base64');
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
