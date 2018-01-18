const VALUE_RANGES = {
  NEGATIVE: 'NEGATIVE',
  NON_NEGATIVE: 'NON_NEGATIVE',
  POSITIVE: 'POSITIVE',
  NON_POSITIVE: 'NON_POSITIVE',
};

const VALUE_TYPES = {
  INT: 'int',
  FLOAT: 'float',
};

// TODO: Consider implementing coercion like this...
// See: https://github.com/graphql/graphql-js/blob/master/src/type/scalars.js#L13
// See: https://github.com/graphql/graphql-js/blob/master/src/type/scalars.js#L60

function _validateInt(value) {
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

function _validateFloat(value) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`Value is not a finite number: ${value}`);
  }
}

function processValue(value, range, type) {
  if (value === null
      || typeof value === 'undefined'
      || isNaN(value)
      || Number.isNaN(value)
      || value === Number.NaN) {
    throw new TypeError(`Value is not a number: ${value}`);
  }

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

  if ((range === VALUE_RANGES.NEGATIVE && !(parsedValue < 0))
      || (range === VALUE_RANGES.NON_NEGATIVE && !(parsedValue >= 0))
      || (range === VALUE_RANGES.POSITIVE && !(parsedValue > 0))
      || (range === VALUE_RANGES.NON_POSITIVE && !(parsedValue <= 0))) {
    throw new TypeError(`Value is not a ${VALUE_RANGES[range].toLowerCase().replace('_', '-')} number: ${value}`);
  }

  return parsedValue;
}

export { processValue, VALUE_RANGES, VALUE_TYPES };
