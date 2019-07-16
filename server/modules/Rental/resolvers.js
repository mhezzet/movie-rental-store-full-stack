import { UserInputError, AuthenticationError, ApolloError } from 'apollo-server'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

async function makeRental(
  _,
  args,
  { models: { Rental, Inventory, User, Movie }, user: { id } }
) {
  const inventory = await Inventory.findOne({ _id: args.inventoryID })
  if (!inventory) throw new UserInputError('no such an inventory')

  const movies = await Movie.updateMany(
    {
      $and: [{ _id: { $in: inventory.movies } }, { numberInStock: { $gt: 0 } }]
    },
    { $inc: { numberInStock: -1 } }
  )

  if (!movies.nModified) throw new ApolloError('internal server error')

  let rental = await Rental.create({
    inventory: args.inventoryID,
    user: id,
    returnDate: args.returnDate
  })

  await User.findOneAndUpdate({ _id: id }, { $push: { rentals: rental._id } })

  await Rental.populate(rental, {
    path: 'inventory user',
    populate: { path: 'movies rentals' }
  })

  return rental
}

async function rental(_, args, { models: { Rental }, user: { id } }) {
  const rental = await Rental.findOne({ _id: args.rentalID }).populate({
    path: 'inventory user',
    populate: { path: 'movies rentals' }
  })

  if (rental.user._id != id)
    throw new AuthenticationError('accessed denied: you r not allowed')

  return rental
}

async function rentalsByUser(_, args, { models: { Rental }, user: { id } }) {
  const rentals = await Rental.find({ user: id }).populate({
    path: 'inventory user',
    populate: { path: 'movies rentals' }
  })

  return rentals
}

async function rentals(_, args, { models: { Rental } }) {
  const rentals = await Rental.find({}).populate({
    path: 'inventory user',
    populate: { path: 'movies rentals' }
  })

  return rentals
}

export default {
  Mutation: {
    makeRental
  },
  Query: {
    rental,
    rentalsByUser,
    rentals
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(Number(ast.value)) // ast value is always in string format
      }
      return null
    }
  })
}
