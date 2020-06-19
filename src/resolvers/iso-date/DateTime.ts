/**
 * Copyright (c) 2017, Dirk-Jan Rutten
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { GraphQLScalarType, Kind } from 'graphql'
import type {GraphQLScalarTypeConfig} from 'graphql' // eslint-disable-line
import { validateJSDate, validateDateTime, validateUnixTimestamp } from './validator'
import { serializeDateTime, serializeDateTimeString, serializeUnixTimestamp, parseDateTime } from './formatter'

/**
 * An RFC 3339 compliant date-time scalar.
 *
 * Input:
 *    This scalar takes an RFC 3339 date-time string as input and
 *    parses it to a javascript Date.
 *
 * Output:
 *    This scalar serializes javascript Dates,
 *    RFC 3339 date-time strings and unix timestamps
 *    to RFC 3339 UTC date-time strings.
 */
const config: GraphQLScalarTypeConfig<Date, string> = {
  name: 'DateTime',
  description: 'A date-time string at UTC, such as 2007-12-03T10:15:30Z, ' +
               'compliant with the `date-time` format outlined in section 5.6 of ' +
               'the RFC 3339 profile of the ISO 8601 standard for representation ' +
               'of dates and times using the Gregorian calendar.',
  serialize (value) {
    if (value instanceof Date) {
      if (validateJSDate(value)) {
        return serializeDateTime(value)
      }
      throw new TypeError('DateTime cannot represent an invalid Date instance')
    } else if (typeof value === 'string') {
      if (validateDateTime(value)) {
        return serializeDateTimeString(value)
      }
      throw new TypeError(
        `DateTime cannot represent an invalid date-time-string ${value}.`
      )
    } else if (typeof value === 'number') {
      if (validateUnixTimestamp(value)) {
        return serializeUnixTimestamp(value)
      }
      throw new TypeError(
        'DateTime cannot represent an invalid Unix timestamp ' + value
      )
    } else {
      throw new TypeError(
        'DateTime cannot be serialized from a non string, ' +
        'non numeric or non Date type ' + JSON.stringify(value)
      )
    }
  },
  parseValue (value) {
    if (!(typeof value === 'string')) {
      throw new TypeError(
        `DateTime cannot represent non string type ${JSON.stringify(value)}`
      )
    }

    if (validateDateTime(value)) {
      return parseDateTime(value)
    }
    throw new TypeError(
      `DateTime cannot represent an invalid date-time-string ${value}.`
    )
  },
  parseLiteral (ast) {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        `DateTime cannot represent non string type ${'value' in ast && ast.value}`
      )
    }
    const { value } = ast
    if (validateDateTime(value)) {
      return parseDateTime(value)
    }
    throw new TypeError(
      `DateTime cannot represent an invalid date-time-string ${String(value)}.`
    )
  }
}

export default new GraphQLScalarType(config)
