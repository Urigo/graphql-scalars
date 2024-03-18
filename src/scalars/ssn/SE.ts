import { GraphQLScalarType, Kind } from 'graphql';
import { createGraphQLError } from '../../error.js';

// Swedish Personal Number also known as 'personnummer' in swedish:
// https://www.skatteverket.se/privat/folkbokforing/personnummer.4.3810a01c150939e893f18c29.html
// Algorithm:
// https://swedish.identityinfo.net/personalidentitynumber

const SESSN_PATTERNS = ['YYYYMMDDXXXX', 'YYMMDDXXXX'];

function _isValidSwedishPersonalNumber(value: string): boolean {
  // Remove any non-digit characters
  const pno: string = value.replace(/\D/g, '');
  // Check if the cleaned number has the correct length (10 or 12 digits)
  if (pno.length !== 10 && pno.length !== 12) {
    return false;
  }

  // Validate the birthdate
  if (!_isValidDate(pno)) {
    return false;
  }

  // Check the checksum for numbers
  if (!_isValidChecksum(pno)) {
    return false;
  }

  // If all checks pass, the personal number is valid
  return true;
}

function _isValidDate(pno: string): boolean {
  let year: number;
  let month: number;
  let day: number;

  if (pno.length === 10) {
    year = Number(pno.substring(0, 2));
    // Adjust the input 'year' to a four-digit year based on the assumption that two-digit years greater than the current year are in the past century (1900s),
    // while two-digit years less than or equal to the current year are in the current or upcoming century (2000s).
    year = year > Number(String(new Date().getFullYear()).substring(2)) ? 1900 + year : 2000 + year;
    month = Number(pno.substring(2, 4));
    day = Number(pno.substring(4, 6));
  } else {
    year = Number(pno.substring(0, 4));
    month = Number(pno.substring(4, 6));
    day = Number(pno.substring(6, 8));
  }

  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
}

function _isValidChecksum(pno: string): boolean {
  const shortPno: string = pno.length === 12 ? pno.substring(2, 12) : pno;
  const digits: number[] = shortPno.split('').map(Number);
  let sum: number = 0;

  for (let i: number = 0; i < digits.length; i++) {
    let digit = digits[i];

    // Double every second digit from the right
    if (i % 2 === digits.length % 2) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }

  // Check if the sum is a multiple of 10
  return sum % 10 === 0;
}

function _checkString(value: any): void {
  if (typeof value !== 'string') {
    throw createGraphQLError(`Value is not string: ${value}`);
  }
}

function _checkSSN(value: string): void {
  if (!_isValidSwedishPersonalNumber(value)) {
    throw createGraphQLError(`Value is not a valid swedish personal number: ${value}`);
  }
}

export const GraphQLSESSN: GraphQLScalarType = /*#__PURE__*/ new GraphQLScalarType({
  name: 'SESSN',
  description:
    'A field whose value conforms to the standard personal number (personnummer) formats for Sweden',

  serialize(value) {
    _checkString(value);
    _checkSSN(value as string);

    return value;
  },

  parseValue(value) {
    _checkString(value);
    _checkSSN(value as string);

    return value;
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw createGraphQLError(
        `Can only validate strings as swedish personal number but got a: ${ast.kind}`,
        { nodes: ast },
      );
    }

    if (!_isValidSwedishPersonalNumber(ast.value)) {
      throw createGraphQLError(`Value is not a valid swedish personal number: ${ast.value}`, {
        nodes: ast,
      });
    }

    return ast.value;
  },

  extensions: {
    codegenScalarType: 'string',
    jsonSchema: {
      title: 'SESSN',
      oneOf: SESSN_PATTERNS.map((pattern: string) => ({
        type: 'string',
        length: pattern.length,
        pattern,
      })),
    },
  },
});
