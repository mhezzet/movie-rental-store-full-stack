import { UserInputError, AuthenticationError } from 'apollo-server'
import axios from 'axios'

/**
|--------------------------------------------------
| Register Local
|--------------------------------------------------
*/
async function registerLocal(_, args, { models: { User } }) {
  const user = await User.create({
    method: 'local',
    roles: ['user'],
    ...args
  })

  const token = user.genToken()
  await User.populate(user, {
    path: 'rentals',
    populate: { path: 'inventory', populate: { path: 'movies' } }
  })
  return { user, token }
}

/**
|--------------------------------------------------
| Register FaceBook
|--------------------------------------------------
*/
async function registerFaceBook(_, args, { models: { User } }) {
  let response
  try {
    response = await axios.get('https://graph.facebook.com/v3.2/me', {
      params: {
        access_token: args.authToken,
        fields: 'email, last_name,first_name, id, picture{url}'
      }
    })
  } catch {
    throw new AuthenticationError('invalid access token')
  }

  let user = await User.findOne({ facebookID: response.data.id }).populate({
    path: 'rentals',
    populate: { path: 'inventory', populate: { path: 'movies' } }
  })
  if (user) {
    const token = user.genToken()
    return { user, token }
  }

  user = await User.create({
    method: 'facebook',
    roles: ['user'],
    facebookID: response.data.id,
    picture: response.data.picture.data.url,
    firstName: response.data.first_name,
    lastName: response.data.last_name
  })

  const token = user.genToken()
  await User.populate(user, {
    path: 'rentals',
    populate: { path: 'inventory', populate: { path: 'movies' } }
  })
  return { user, token }
}

/**
|--------------------------------------------------
| Register Google
|--------------------------------------------------
*/
async function registerGoogle(_, args, { models: { User } }) {
  let response
  try {
    response = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${args.authToken}`
        }
      }
    )
  } catch {
    throw new AuthenticationError('invalid access token')
  }

  let user = await User.findOne({ googleID: response.data.id }).populate({
    path: 'rentals',
    populate: { path: 'inventory', populate: { path: 'movies' } }
  })
  if (user) {
    const token = user.genToken()
    return { user, token }
  }

  user = await User.create({
    method: 'google',
    roles: ['user'],
    googleID: response.data.id,
    picture: response.data.picture,
    firstName: response.data.given_name,
    lastName: response.data.family_name
  })

  const token = user.genToken()
  await User.populate(user, {
    path: 'rentals',
    populate: { path: 'inventory', populate: { path: 'movies' } }
  })
  return { user, token }
}

/**
|--------------------------------------------------
| Update Profile
|--------------------------------------------------
*/
async function updateProfile(_, args, { models: { User }, user: { id } }) {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: { ...args.data } },
    { new: true }
  )
  if (!user) throw new UserInputError('no such a user')

  await User.populate(user, {
    path: 'rentals',
    populate: { path: 'inventory', populate: { path: 'movies' } }
  })
  return user
}

/**
|--------------------------------------------------
| Add An Address
|--------------------------------------------------
*/
async function addAnAddress(_, args, { models: { User }, user: { id } }) {
  const user = await User.findOne({ _id: id })
  if (!user) throw new UserInputError('no such a user')

  user.addresses.push({ ...args.address })
  await user.save()

  return user.addresses[user.addresses.length - 1]
}

/**
|--------------------------------------------------
| Update An Address
|--------------------------------------------------
*/
async function updateAnAddress(_, args, { models: { User }, user: { id } }) {
  let user = await User.findOne({ 'addresses._id': args.addressID })
  if (!user) throw new UserInputError('no such an address')
  if (user._id != id) throw new AuthenticationError('you r not authorized')

  const index = user.addresses.findIndex(
    address => address._id == args.addressID
  )

  user.addresses[index].city = args.address.city
  user.addresses[index].country = args.address.country
  user.addresses[index].address = args.address.address
  user.addresses[index].ddress2 = args.address.address2
  user.addresses[index].district = args.address.district
  user.addresses[index].postalCode = args.address.postalCode
  user.addresses[index].phone = args.address.phone

  await user.save()

  return user.addresses[index]
}

/**
|--------------------------------------------------
| Delete User
|--------------------------------------------------
*/
async function deleteUser(_, args, { models: { User } }) {
  const user = await User.findOneAndRemove({ _id: args.userID })
  if (!user) throw new UserInputError('no such a user')

  await User.populate(user, {
    path: 'rentals',
    populate: { path: 'inventory', populate: { path: 'movies' } }
  })

  return user
}

/**
|--------------------------------------------------
| Login Local
|--------------------------------------------------
*/
async function loginLocal(_, args, { models: { User } }) {
  const user = await User.findOne({ email: args.email }).populate({
    path: 'rentals',
    populate: { path: 'inventory', populate: { path: 'movies' } }
  })
  if (!user) throw new UserInputError('invalid email or password')

  const validPassword = await user.validPassword(args.password)
  if (!validPassword) throw new UserInputError('invalid email or password')

  const token = user.genToken()
  return { user, token }
}

/**
|--------------------------------------------------
| me
|--------------------------------------------------
*/
async function me(_, __, { models: { User }, user: { id } }) {
  const user = await User.findOne({ _id: id }).populate({
    path: 'rentals',
    populate: { path: 'inventory', populate: { path: 'movies' } }
  })
  if (!user) throw new UserInputError('no such a user')

  return user
}

/**
|--------------------------------------------------
| users
|--------------------------------------------------
*/
async function users(_, __, { models: { User } }) {
  const users = await User.find({}).populate({
    path: 'rentals',
    populate: { path: 'inventory', populate: { path: 'movies' } }
  })

  return users
}

/**
|--------------------------------------------------
| addresses
|--------------------------------------------------
*/
async function addresses(_, __, { models: { User }, user: { id } }) {
  const user = await User.findOne({ _id: id })
  return user.addresses
}

/**
|--------------------------------------------------
| address
|--------------------------------------------------
*/
async function address(_, args, { models: { User }, user: { id } }) {
  let user = await User.findOne({ 'addresses._id': args.addressID })
  if (!user) throw new UserInputError('no such an address')
  if (user._id != id) throw new AuthenticationError('you r not authorized')

  const address = user.addresses.find(address => address._id == args.addressID)

  return address
}

/**
|--------------------------------------------------
| Delete An Address
|--------------------------------------------------
*/
async function deleteAnAddress(_, args, { models: { User }, user: { id } }) {
  let user = await User.findOne({ 'addresses._id': args.addressID })
  if (!user) throw new UserInputError('no such an address')
  if (user._id != id) throw new AuthenticationError('you r not authorized')

  const index = user.addresses.findIndex(
    address => address._id == args.addressID
  )

  const address = user.addresses.splice(index, 1)
  await user.save()
  return address[0]
}

export default {
  Mutation: {
    registerLocal,
    registerFaceBook,
    registerGoogle,
    updateProfile,
    addAnAddress,
    updateAnAddress,
    deleteUser,
    loginLocal,
    deleteAnAddress
  },
  Query: {
    me,
    users,
    addresses,
    address
  }
}
