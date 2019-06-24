enum VALUE_RANGES {
  NEGATIVE = 'NEGATIVE',
  NON_NEGATIVE = 'NON_NEGATIVE',
  POSITIVE = 'POSITIVE',
  NON_POSITIVE = 'NON_POSITIVE',
}

enum VALUE_TYPES {
  INT = 'int',
  FLOAT = 'float',
}

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

function processValue(value: any, validation: { range: VALUE_RANGES, type: VALUE_TYPES}) {
  const { range, type } = validation;

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

export { processValue, VALIDATIONS };
