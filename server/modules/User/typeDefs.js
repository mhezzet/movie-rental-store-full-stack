import { gql } from 'apollo-server'

export default gql`
  directive @user on FIELD_DEFINITION
  directive @admin on FIELD_DEFINITION

  type Mutation {
    registerLocal(email: String!, password: String!): AuthResolver
    registerFaceBook(authToken: String!): AuthResolver
    registerGoogle(authToken: String!): AuthResolver
    updateProfile(data: updateProfileInput!): User @user
    addAnAddress(address: address!): Address @user
    updateAnAddress(addressID: ID!, address: address!): Address @user
    deleteUser(userID: ID!): User @admin
    deleteAnAddress(addressID: ID!): Address @user
    loginLocal(email: String!, password: String!): AuthResolver
  }

  type Query {
    me: User @user
    users: [User!]! @admin
    addresses: [Address!]! @user
    address(addressID: ID!): Address @user
  }

  type AuthResolver {
    user: User
    token: String
  }

  type User {
    id: ID!
    email: String
    picture: String
    firstName: String
    lastName: String
    addresses: [Address]
    rentals: [Rental!]!
    roles:[String!]!
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

  input updateProfileInput {
    picture: String
    firstName: String
    lastName: String
  }

  input address {
    city: String
    country: String
    address: String
    address2: String
    district: String
    postalCode: String
    phone: String
  }
`
