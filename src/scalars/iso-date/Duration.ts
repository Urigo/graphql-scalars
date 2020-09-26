import { GraphQLScalarTypeConfig } from 'graphql';
export type ISO8601Duration = string;

export const GraphQLISO8601Duration: GraphQLScalarTypeConfig<
  ISO8601Duration,
  ISO8601Duration
> = {
  name: 'ISO8601Duration',
  description: `
    A string representing a duration conforming to the ISO8601 standard,
    such as: P1W1DT13H23M34S
    P is the duration designator (for period) placed at the start of the duration representation.
    Y is the year designator that follows the value for the number of years.
    M is the month designator that follows the value for the number of months.
    W is the week designator that follows the value for the number of weeks.
    D is the day designator that follows the value for the number of days.
    T is the time designator that precedes the time components of the representation.
    H is the hour designator that follows the value for the number of hours.
    M is the minute designator that follows the value for the number of minutes.
    S is the second designator that follows the value for the number of seconds.

    Note the time designator, T, that precedes the time value
  `,

  serialize(value) {
    if (typeof value !== 'string') {
      throw new TypeError(`Value is not string: ${value}`);
    }

    return value;
  },
};
