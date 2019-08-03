const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type Todo {
    id: ID!
    name: String!
    done: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getAllTodos: [Todo!]!
  }

  type Mutation {
    addTodo(name: String!): Todo!
    doneTodo(id: ID!, done: Boolean!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`)