import { gql } from 'apollo-server'

export default gql`
  scalar Date

  extend type Mutation {
    makeRental(inventoryID: ID!, returnDate: Date!): Rental @user
  }

  extend type Query {
    rental(rentalID: ID!): Rental @user
    rentalsByUser: [Rental!]! @user
    rentals: [Rental!]! @admin
  }

  type Rental {
    id: ID!
    rentalDate: Date!
    returnDate: Date!
    inventory: Inventory
    user: User
  }
`
