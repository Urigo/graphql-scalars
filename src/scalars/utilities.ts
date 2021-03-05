enum VALUE_RANGES {
  NEGATIVE,
  NON_NEGATIVE,
  POSITIVE,
  NON_POSITIVE,
}

enum VALUE_TYPES {
  INT,
  FLOAT,
}

// More info about Sexagesimal: https://en.wikipedia.org/wiki/Sexagesimal
const SEXAGESIMAL_REGEX = /^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,}))?)['′]\s*(([0-9]{1,3}(\.([0-9]{1,}))?)["″]\s*)?([NEOSW]?)$/;

// TODO: Consider implementing coercion like this...
// See: https://github.com/graphql/graphql-js/blob/master/src/type/scalars.js#L13
// See: https://github.com/graphql/graphql-js/blob/master/src/type/scalars.js#L60

function _validateInt(value: any) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`Value is not a finite number: ${value}`);
  }

  if (!Number.isInteger(value)) {
    throw new TypeError(`Value is not an integer: ${value}`);
  }

  if (!Number.isSafeInteger(value)) {
    throw new TypeError(`Value is not a safe integer: ${value}`);
  }
}

function _validateFloat(value: any) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`Value is not a finite number: ${value}`);
  }
}

export function processValue(value: any, scalarName: string) {
  const VALIDATIONS = {
    NonPositiveInt: {
      range: VALUE_RANGES.NON_POSITIVE,
      type: VALUE_TYPES.INT,
    },
    PositiveInt: {
      range: VALUE_RANGES.POSITIVE,
      type: VALUE_TYPES.INT,
    },
    NonNegativeInt: {
      range: VALUE_RANGES.NON_NEGATIVE,
      type: VALUE_TYPES.INT,
    },
    NegativeInt: {
      range: VALUE_RANGES.NEGATIVE,
      type: VALUE_TYPES.INT,
    },

    NonPositiveFloat: {
      range: VALUE_RANGES.NON_POSITIVE,
      type: VALUE_TYPES.FLOAT,
    },
    PositiveFloat: {
      range: VALUE_RANGES.POSITIVE,
      type: VALUE_TYPES.FLOAT,
    },
    NonNegativeFloat: {
      range: VALUE_RANGES.NON_NEGATIVE,
      type: VALUE_TYPES.FLOAT,
    },
    NegativeFloat: {
      range: VALUE_RANGES.NEGATIVE,
      type: VALUE_TYPES.FLOAT,
    },
  };

  const { range, type } = VALIDATIONS[scalarName];

  /* eslint-disable no-restricted-globals */
  if (
    value === null ||
    typeof value === 'undefined' ||
    isNaN(value) ||
    Number.isNaN(value) ||
    value === Number.NaN
  ) {
    throw new TypeError(`Value is not a number: ${value}`);
  }
  /* eslint-enable */

  let parsedValue;

  switch (type) {
    case VALUE_TYPES.FLOAT:
      parsedValue = parseFloat(value);
      _validateFloat(parsedValue);
      break;

    case VALUE_TYPES.INT:
      parsedValue = parseInt(value, 10);
      _validateInt(parsedValue);
      break;

    default:
    // no -op, return undefined
  }

  if (
    (range === VALUE_RANGES.NEGATIVE && !(parsedValue < 0)) ||
    (range === VALUE_RANGES.NON_NEGATIVE && !(parsedValue >= 0)) ||
    (range === VALUE_RANGES.POSITIVE && !(parsedValue > 0)) ||
    (range === VALUE_RANGES.NON_POSITIVE && !(parsedValue <= 0))
  ) {
    throw new TypeError(
      `Value is not a ${VALUE_RANGES[range]
        .toLowerCase()
        .replace('_', '-')} number: ${value}`,
    );
  }

  return parsedValue;
}

/**
 * Check if the value is in decimal format.
 *
 * @param value - Value to check
 * @returns True if is decimal, false otherwise
 */
export function isDecimal(value: any): boolean {
  const checkedValue = value.toString().trim();

  if (Number.isNaN(Number.parseFloat(checkedValue))) {
    return false;
  }

  return Number.parseFloat(checkedValue) === Number(checkedValue);
}

/**
 * Check if the value is in sexagesimal format.
 *
 * @param value - Value to check
 * @returns True if sexagesimal, false otherwise
 */
export function isSexagesimal(value: any): boolean {
  if (typeof value !== 'string') return false;

  return SEXAGESIMAL_REGEX.test(value.toString().trim());
}

/**
 * Converts a sexagesimal coordinate to decimal format.
 *
 * @param value - Value to convert
 * @returns Decimal coordinate
 * @throws {TypeError} if the value is not in sexagesimal format
 */
export function sexagesimalToDecimal(value: any) {
  const data = SEXAGESIMAL_REGEX.exec(value);

  if (typeof data === 'undefined' || data === null) {
    throw new TypeError(`Value is not in sexagesimal format: ${value}`);
  }

  const min = Number(data[2]) / 60 || 0;
  const sec = Number(data[4]) / 3600 || 0;
  const decimal = Number.parseFloat(data[1]) + min + sec;

  // Southern and western coordinates must be negative decimals
  return ['S', 'W'].includes(data[7]) ? -decimal : decimal;
}
