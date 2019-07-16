import gql from 'graphql-tag'

/**
|--------------------------------------------------
| REGISTER_LOCAL
|--------------------------------------------------
*/

export const REGISTER_LOCAL = gql`
  mutation registerLocal($email: String!, $password: String!) {
    registerLocal(email: $email, password: $password) {
      user {
        id
        email
        picture
        firstName
        lastName
        roles
      }
      token
    }
  }
`

/**
|--------------------------------------------------
| LOGIN_LOCAL
|--------------------------------------------------
*/

export const LOGIN_LOCAL = gql`
  mutation loginLocal($email: String!, $password: String!) {
    loginLocal(email: $email, password: $password) {
      user {
        id
        email
        picture
        firstName
        lastName
        roles
        addresses {
          id
          city
          country
          address
          address2
          district
          postalCode
          phone
        }
        rentals {
          id
          rentalDate
          returnDate
          inventory {
            id
            movies {
              id
              title
              description
              releaseYear
              numberInStock
              rating
              genre
            }
          }
        }
      }
      token
    }
  }
`
/**
|--------------------------------------------------
| ME
|--------------------------------------------------
*/

export const ME = gql`
  query me {
    me {
      id
      email
      picture
      firstName
      lastName
      roles
      rentals {
        id
        rentalDate
        returnDate
        inventory {
          id
          movies {
            id
            title
            description
            releaseYear
            numberInStock
            rating
            genre
          }
        }
      }
      addresses {
        id
        city
        country
        address
        address2
        district
        postalCode
        phone
      }
    }
  }
`
/**
|--------------------------------------------------
| REGISTER_GOOGLE
|--------------------------------------------------
*/

export const REGISTER_GOOGLE = gql`
  mutation registerGoogle($authToken: String!) {
    registerGoogle(authToken: $authToken) {
      user {
        id
        email
        picture
        firstName
        lastName
        roles
        addresses {
          id
          city
          country
          address
          address2
          district
          postalCode
          phone
        }
      }
      token
    }
  }
`
/**
|--------------------------------------------------
| REGISTER_FACEBOOK
|--------------------------------------------------
*/

export const REGISTER_FACEBOOK = gql`
  mutation registerFaceBook($authToken: String!) {
    registerFaceBook(authToken: $authToken) {
      user {
        id
        email
        picture
        firstName
        lastName
        roles
        addresses {
          id
          city
          country
          address
          address2
          district
          postalCode
          phone
        }
      }
      token
    }
  }
`

/**
|--------------------------------------------------
| UPDATE_PROFILE
|--------------------------------------------------
*/

export const UPDATE_PROFILE = gql`
  mutation updateProfile($data: updateProfileInput!) {
    updateProfile(data: $data) {
      id
      email
      picture
      firstName
      lastName
      roles
      addresses {
        id
        city
        country
        address
        address2
        district
        postalCode
        phone
      }
    }
  }
`

/**
|--------------------------------------------------
| ADD_AN_ADDRESS
|--------------------------------------------------
*/

export const ADD_AN_ADDRESS = gql`
  mutation addAnAddress($address: address!) {
    addAnAddress(address: $address) {
      id
      city
      country
      address
      address2
      district
      postalCode
      phone
    }
  }
`
/**
|--------------------------------------------------
| UPDATE_AN_ADDRESS
|--------------------------------------------------
*/

export const UPDATE_AN_ADDRESS = gql`
  mutation updateAnAddress($addressID: ID!, $address: address!) {
    updateAnAddress(addressID: $addressID, address: $address) {
      id
      city
      country
      address
      address2
      district
      postalCode
      phone
    }
  }
`
/**
|--------------------------------------------------
| DELETE_AN_ADDRESS
|--------------------------------------------------
*/

export const DELETE_AN_ADDRESS = gql`
  mutation deleteAnAddress($addressID: ID!) {
    deleteAnAddress(addressID: $addressID) {
      id
      city
      country
      address
      address2
      district
      postalCode
      phone
    }
  }
`

/**
|--------------------------------------------------
| DELETE_USER
|--------------------------------------------------
*/

export const DELETE_USER = gql`
  mutation deleteUser($userID: ID!) {
    deleteUser(userID: $userID) {
      id
      email
      picture
      firstName
      lastName
      addresses {
        id
        city
        country
        address
        address2
        district
        postalCode
        phone
      }
    }
  }
`

/**
|--------------------------------------------------
| USERS
|--------------------------------------------------
*/

export const USERS = gql`
  query users {
    users {
      id
      email
      picture
      firstName
      lastName
      rentals {
        id
        rentalDate
        returnDate
        inventory {
          id
          movies {
            id
            title
            description
            releaseYear
            numberInStock
            rating
            genre
          }
        }
      }
      addresses {
        id
        city
        country
        address
        address2
        district
        postalCode
        phone
      }
    }
  }
`

/**
|--------------------------------------------------
| ADDRESSES
|--------------------------------------------------
*/

export const ADDRESSES = gql`
  query addresses {
    addresses {
      id
      city
      country
      address
      address2
      district
      postalCode
      phone
    }
  }
`
/**
|--------------------------------------------------
| ADDRESS
|--------------------------------------------------
*/

export const ADDRESS = gql`
  query address($addressID: ID!) {
    address(addressID: $addressID) {
      id
      city
      country
      address
      address2
      district
      postalCode
      phone
    }
  }
`
/**
|--------------------------------------------------
| MOVIES
|--------------------------------------------------
*/

export const MOVIES = gql`
  query movies {
    movies {
      id
      title
      description
      releaseYear
      numberInStock
      rating
      genre
      poster
    }
  }
`

/**
|--------------------------------------------------
| ADD_MOVIE
|--------------------------------------------------
*/

export const ADD_MOVIE = gql`
  mutation addMovies($movie: movieInput!) {
    addMovie(movie: $movie) {
      id
      title
      description
      releaseYear
      numberInStock
      rating
      genre
    }
  }
`

/**
|--------------------------------------------------
| MOVIE
|--------------------------------------------------
*/

export const MOVIE = gql`
  query movie($movieID: ID!) {
    movie(movieID: $movieID) {
      id
      title
      description
      releaseYear
      numberInStock
      rating
      genre
    }
  }
`
/**
|--------------------------------------------------
| UPDATE_MOVIE
|--------------------------------------------------
*/

export const UPDATE_MOVIE = gql`
  mutation updateMovie($movieID: ID!, $movie: movieInput!) {
    updateMovie(movieID: $movieID, movie: $movie) {
      id
      title
      description
      releaseYear
      numberInStock
      rating
      poster
      genre
    }
  }
`

/**
|--------------------------------------------------
| DELETE_MOVIE
|--------------------------------------------------
*/

export const DELETE_MOVIE = gql`
  mutation deleteMovie($movieID: ID!) {
    deleteMovie(movieID: $movieID) {
      id
      title
      description
      releaseYear
      numberInStock
      rating
      genre
    }
  }
`

/**
|--------------------------------------------------
| NEW_INVENTORY
|--------------------------------------------------
*/

export const NEW_INVENTORY = gql`
  mutation newInventory($movies: [ID!]!) {
    newInventory(movies: $movies) {
      id
      movies {
        id
        title
        description
        releaseYear
        numberInStock
        rating
        genre
      }
    }
  }
`
/**
|--------------------------------------------------
| MAKE_RENTAL
|--------------------------------------------------
*/

export const MAKE_RENTAL = gql`
  mutation makeRental($inventoryID: ID!, $returnDate: Date!) {
    makeRental(inventoryID: $inventoryID, returnDate: $returnDate) {
      id
      rentalDate
      returnDate
      inventory {
        id
        movies {
          id
          title
          description
          releaseYear
          numberInStock
          rating
          genre
        }
      }
      user {
        id
        email
        picture
        firstName
        lastName
        addresses {
          id
          city
          country
          address
          address2
          district
          postalCode
          phone
        }
        rentals {
          id
          rentalDate
          returnDate
        }
      }
    }
  }
`
/**
|--------------------------------------------------
| RENTAL
|--------------------------------------------------
*/

export const RENTAL = gql`
  query rental($rentalID: ID!) {
    rental(rentalID: $rentalID) {
      id
      rentalDate
      returnDate
      inventory {
        id
        movies {
          id
          title
          description
          releaseYear
          numberInStock
          rating
          genre
        }
      }
      user {
        id
        email
        picture
        firstName
        lastName
        addresses {
          id
          city
          country
          address
          address2
          district
          postalCode
          phone
        }
        rentals {
          id
          rentalDate
          returnDate
        }
      }
    }
  }
`
/**
|--------------------------------------------------
| RENTALS_BY_USER
|--------------------------------------------------
*/

export const RENTALS_BY_USER = gql`
  query rentalsByUser {
    rentalsByUser {
      id
      rentalDate
      returnDate
      inventory {
        id
        movies {
          id
          title
          description
          releaseYear
          numberInStock
          rating
          genre
        }
      }
    }
  }
`
/**
|--------------------------------------------------
| RENTALS
|--------------------------------------------------
*/

export const RENTALS = gql`
  query rentals {
    rentals {
      id
      rentalDate
      returnDate
      inventory {
        id
        movies {
          id
          title
          description
          releaseYear
          numberInStock
          rating
          genre
        }
      }
      user {
        id
        email
        picture
        firstName
        lastName
        addresses {
          id
          city
          country
          address
          address2
          district
          postalCode
          phone
        }
      }
    }
  }
`
