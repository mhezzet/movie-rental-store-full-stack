import { UserInputError } from 'apollo-server'

async function newInventory(_, { movies }, { models: { Inventory, Movie } }) {
  movies.forEach(async id => {
    const movie = await Movie.findOne({ _id: id })
    if (!movie) throw new UserInputError(`no such a movie "${id}"`)
    if (movie.numberInStock < 1)
      throw new UserInputError(`the movie "${movie.title}" is out of stock`)
  })

  let inventory = await Inventory.create({ movies })
  await Inventory.populate(inventory, 'movies')

  return inventory
}

export default {
  Mutation: {
    newInventory
  }
}
