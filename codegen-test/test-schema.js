const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { resolvers } = require('../dist');

const fields = {};
for (const scalarName in resolvers) {
  fields[scalarName.toLowerCase()] = {
    type: resolvers[scalarName],
  };
}

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields,
  }),
});
