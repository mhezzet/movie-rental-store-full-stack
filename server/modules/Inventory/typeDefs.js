import { gql } from 'apollo-server'

export default gql`
  extend type Mutation {
    newInventory(movies: [ID!]!): Inventory @user
  }

  type Inventory {
    id: ID!
    movies: [Movie!]!
  }
`
