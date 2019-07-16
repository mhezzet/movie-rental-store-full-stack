import { makeExecutableSchema } from 'apollo-server'
import schemaDirectives from '../directives'
import { userResolvers, userTypeDefs, User } from './User'
import { rentalResolvers, rentalTypeDefs, Rental } from './Rental'
import { inventoryResolvers, inventoryTypeDefs, Inventory } from './Inventory'
import { movieResolvers, movieTypeDefs, Movie } from './Movie'

export const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, rentalTypeDefs, inventoryTypeDefs, movieTypeDefs],
  resolvers: [
    userResolvers,
    rentalResolvers,
    inventoryResolvers,
    movieResolvers
  ],
  schemaDirectives
})

export const models = {
  User,
  Rental,
  Inventory,
  Movie
}
