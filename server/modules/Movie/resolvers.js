import { UserInputError, AuthenticationError } from 'apollo-server'

async function movie(_, args, { models: { Movie } }) {
  const movie = await Movie.findOne({ _id: args.movieID })
  if (!movie) throw new UserInputError('no such a movie')

  return movie
}

async function movies(_, __, { models: { Movie } }) {
  const movies = await Movie.find({})

  return movies
}

async function addMovie(_, args, { models: { Movie } }) {
  const movie = await Movie.create({ ...args.movie })
  return movie
}

async function updateMovie(_, args, { models: { Movie } }) {
  const movie = await Movie.findOneAndUpdate(
    { _id: args.movieID },
    {
      $set: { ...args.movie }
    },
    {
      new: true
    }
  )
  if (!movie) throw new UserInputError('no such a movie')

  return movie
}

async function deleteMovie(_, args, { models: { Movie } }) {
  const movie = await Movie.findOneAndDelete({ _id: args.movieID })
  if (!movie) throw new UserInputError('no such a movie')

  return movie
}

export default {
  Query: {
    movie,
    movies
  },
  Mutation: {
    addMovie,
    updateMovie,
    deleteMovie
  }
}
