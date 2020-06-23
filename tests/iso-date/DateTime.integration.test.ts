/**
 * Copyright (c) 2018, Dirk-Jan Rutten
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLError,
} from 'graphql';
import { GraphQLDateTime } from '../../src/scalars/iso-date/DateTime';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      validDate: {
        type: GraphQLDateTime,
        resolve: () => new Date('2016-05-02T10:31:42.2Z'),
      },
      validUTCDateString: {
        type: GraphQLDateTime,
        resolve: () => '1991-12-24T00:00:00Z',
      },
      validDateString: {
        type: GraphQLDateTime,
        resolve: () => '2016-02-01T00:00:00-11:00',
      },
      validUnixTimestamp: {
        type: GraphQLDateTime,
        resolve: () => 854325678000,
      },
      invalidDateString: {
        type: GraphQLDateTime,
        resolve: () => '2017-01-001T00:00:00Z',
      },
      invalidDate: {
        type: GraphQLDateTime,
        resolve: () => new Date('wrong'),
      },
      invalidUnixTimestamp: {
        type: GraphQLDateTime,
        resolve: () => Number.POSITIVE_INFINITY,
      },
      invalidType: {
        type: GraphQLDateTime,
        resolve: () => [],
      },
      input: {
        type: GraphQLDateTime,
        args: {
          date: {
            type: GraphQLDateTime,
          },
        },
        resolve: (_, input: { date: Date }) => input.date,
      },
    },
  }),
});

it('executes a query that includes a DateTime', async () => {
  const query = `
     query DateTest($date: DateTime!) {
       validDate
       validUTCDateString,
       validDateString
       validUnixTimestamp
       input(date: $date)
       inputNull: input
     }
   `;

  const variables = { date: '2017-10-01T00:00:00Z' };

  const response = await graphql(schema, query, null, null, variables);

  expect(response).toEqual({
    data: {
      validDate: '2016-05-02T10:31:42.200Z',
      validUTCDateString: '1991-12-24T00:00:00Z',
      validDateString: '2016-02-01T11:00:00Z',
      input: '2017-10-01T00:00:00.000Z',
      validUnixTimestamp: '1997-01-27T00:41:18.000Z',
      inputNull: null,
    },
  });
});

it('shifts an input date-time to UTC', async () => {
  const query = `
     query DateTest($date: DateTime!) {
       input(date: $date)
     }
   `;

  const variables = { date: '2016-02-01T00:00:00-11:00' };

  const response = await graphql(schema, query, null, null, variables);

  expect(response).toEqual({
    data: {
      input: '2016-02-01T11:00:00.000Z',
    },
  });
});

it('parses input to a JS Date', (done) => {
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        input: {
          type: GraphQLDateTime,
          args: {
            date: {
              type: GraphQLDateTime,
            },
          },
          resolve: (_, input) => {
            try {
              expect(input.date).toEqual(
                new Date(Date.UTC(2016, 1, 1, 0, 0, 15)),
              );
              done();
            } catch (e) {
              done.fail(e);
            }
          },
        },
      },
    }),
  });

  const query = `
     query DateTest($date: DateTime!) {
       input(date: $date)
     }
   `;
  const variables = { date: '2016-02-01T00:00:15Z' };

  graphql(schema, query, null, null, variables);
});

it('errors if an invalid date-time is returned from the resolver', async () => {
  const query = `
     {
       invalidDateString
       invalidDate
       invalidUnixTimestamp
       invalidType
     }
   `;

  const response = await graphql(schema, query);

  expect(response).toEqual({
    data: {
      invalidDateString: null,
      invalidDate: null,
      invalidUnixTimestamp: null,
      invalidType: null,
    },
    errors: [
      new GraphQLError(
        'DateTime cannot represent an invalid date-time-string 2017-01-001T00:00:00Z.',
      ),
      new GraphQLError('DateTime cannot represent an invalid Date instance'),
      new GraphQLError(
        'DateTime cannot represent an invalid Unix timestamp Infinity',
      ),
      new GraphQLError(
        'DateTime cannot be serialized from a non string, non numeric or non Date type []',
      ),
    ],
  });
});

it('errors if the variable value is not a valid date-time', async () => {
  const query = `
     query DateTest($date: DateTime!) {
       input(date: $date)
     }
   `;

  const variables = { date: '2017-10-001T00:00:00Z' };

  const response = await graphql(schema, query, null, null, variables);

  expect(response).toEqual({
    errors: [
      new GraphQLError(
        'Variable "$date" got invalid value "2017-10-001T00:00:00Z"; Expected type "DateTime". DateTime cannot represent an invalid date-time-string 2017-10-001T00:00:00Z.',
      ),
    ],
  });
});

it('errors if the variable value is not of type string', async () => {
  const query = `
     query DateTest($date: DateTime!) {
       input(date: $date)
     }
   `;

  const variables = { date: 4 };

  const response = await graphql(schema, query, null, null, variables);

  expect(response).toEqual({
    errors: [
      new GraphQLError(
        'Variable "$date" got invalid value 4; Expected type "DateTime". DateTime cannot represent non string type 4',
      ),
    ],
  });
});

it('errors if the literal input value is not a valid date-time', async () => {
  const query = `
     {
       input(date: "2017-10-001T00:00:00")
     }
   `;

  const response = await graphql(schema, query);

  expect(response).toEqual({
    errors: [
      new GraphQLError(
        'Expected value of type "DateTime", found "2017-10-001T00:00:00"; DateTime cannot represent an invalid date-time-string 2017-10-001T00:00:00.',
      ),
    ],
  });
});

it('errors if the literal input value in a query is not a string', async () => {
  const query = `
     {
       input(date: 4)
     }
   `;

  const response = await graphql(schema, query);

  expect(response).toEqual({
    errors: [
      new GraphQLError(
        'Expected value of type "DateTime", found 4; DateTime cannot represent non string type 4',
      ),
    ],
  });
});
