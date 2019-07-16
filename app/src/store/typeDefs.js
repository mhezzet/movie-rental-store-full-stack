import gql from 'graphql-tag'

export default gql`
  type Query {
    token: String
    profile: String
    isAuth: Boolean
  }

  type Mutation {
    setAuth(token: ID!, user: User!): Boolean!
    resetAuth: Boolean!
  }

  type User {
    id: ID!
    email: String
    picture: String
    firstName: String
    lastName: String
    addresses: [Address]
    rentals: [Rental!]!
    roles: [String!]!
  }

  type Address {
    id: ID!
    city: String
    country: String
    address: String
    address2: String
    district: String
    postalCode: String
    phone: String
  }

  type Rental {
    id: ID!
    rentalDate: Date!
    returnDate: Date!
    inventory: Inventory
    user: User
  }
`
