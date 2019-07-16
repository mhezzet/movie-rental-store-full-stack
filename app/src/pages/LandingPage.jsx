import { useQuery } from '@apollo/react-hooks'
import {
  Button,
  Callout,
  Collapse,
  Intent,
  Position,
  Tooltip
} from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'
import Basket from '../components/Basket'
import Loading from '../components/Loading'
import MovieCard from '../components/MovieCard'
import MovieDetail from '../components/MovieDetail'
import AuthGuard from '../guards/AuthGuard'
import Header from '../layouts/Header'
import { MOVIES } from '../store'
import styles from './LandingPage.module.css'

export default function LandingPage({ history }) {
  const [view, setView] = useState('gallery')
  const [basket, setBasket] = useState([])
  const [genre, setGenre] = useState('')
  const [query, setQuery] = useState('')
  const [realeaseYears, setRealeaseYears] = useState([])
  const [realeaseYear, setRealeaseYear] = useState('')
  const [filteredMovie, setFilteredMovie] = useState([])
  const [collapse, setCollapse] = useState(false)
  const [currentMovie, setCurrentMovie] = useState({})
  const { data, loading, error } = useQuery(MOVIES)

  //agregate realease years in all movie list
  useEffect(() => {
    if (!loading && !error) {
      const agYears = data.movies.reduce(
        (years, movie) =>
          years.includes(movie.releaseYear)
            ? years
            : [...years, movie.releaseYear],
        []
      )
      setRealeaseYears(agYears)
      setFilteredMovie(data.movies)
    }
  }, [data.movies, loading, error])

  //filter movies
  useEffect(() => {
    let movies = data.movies || []

    if (query)
      movies = movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      )

    if (genre) movies = movies.filter(movie => movie.genre[0] === genre)

    if (realeaseYear)
      movies = movies.filter(movie => movie.releaseYear == realeaseYear)

    setFilteredMovie(movies)
  }, [data.movies, query, realeaseYear, genre])

  if (loading) return <Loading />

  if (error)
    return (
      <Callout intent={Intent.DANGER} icon='error'>
        {error.message}
      </Callout>
    )

  const addToBasketHandler = movie => {
    setBasket(basket => [...basket, movie])
    setView('gallery')
  }

  const disableAddToBasket = () => {
    if (
      basket.findIndex(movie => movie.id === currentMovie.id) === -1 &&
      currentMovie.numberInStock !== 0
    )
      return false
    return true
  }

  return (
    <AuthGuard history={history}>
      <Header history={history} />
      {view === 'gallery' && (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: 'auto',
              padding: '1rem',
              width: 600
            }}
          >
            <div className='bp3-input-group bp3-large bp3-fill'>
              <span className='bp3-icon bp3-icon-search' />
              <input
                onChange={e => {
                  setQuery(e.target.value)
                }}
                type='text'
                className='bp3-input'
                placeholder='Search'
              />
              <span className='bp3-icon bp3-icon-arrow-right' />
            </div>
            <Tooltip content='filter' position={Position.TOP}>
              <Button
                large={true}
                style={{ marginLeft: '1rem' }}
                onClick={() => setCollapse(c => !c)}
                icon='filter'
              />
            </Tooltip>
            {basket.length > 0 && (
              <Tooltip content='basket' position={Position.TOP}>
                <Button
                  large={true}
                  style={{ marginLeft: '1rem' }}
                  onClick={() => setView('basket')}
                  icon='shopping-cart'
                />
              </Tooltip>
            )}
          </div>
          <Collapse keepChildrenMounted={true} isOpen={collapse}>
            <div
              style={{
                width: 400,
                margin: 'auto',
                display: 'flex',
                justifyContent: 'space-evenly'
              }}
            >
              <div className='bp3-select'>
                <select
                  value={genre}
                  onChange={event => setGenre(event.currentTarget.value)}
                >
                  <option value=''>all genre</option>
                  <option value='action'>action</option>
                  <option value='comedy'>comedy</option>
                  <option value='drama'>drama</option>
                </select>
              </div>
              <div className='bp3-select'>
                <select
                  value={realeaseYear}
                  onChange={event => setRealeaseYear(event.currentTarget.value)}
                >
                  <option value=''>all years</option>
                  {realeaseYears.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Collapse>
          <div className={styles.gallery}>
            {filteredMovie.map(movie => (
              <MovieCard
                key={movie.id}
                desc={movie.description}
                pic={movie.poster}
                title={movie.title}
                rating={movie.rating}
                onClick={() => {
                  setCurrentMovie(movie)
                  setView('movie')
                }}
              />
            ))}
          </div>
        </>
      )}
      {view === 'movie' && (
        <MovieDetail
          disableAddToBasket={disableAddToBasket()}
          movie={currentMovie}
          setView={setView}
          onAddToBasket={addToBasketHandler}
        />
      )}
      {view === 'basket' && (
        <Basket setBasket={setBasket} setView={setView} basket={basket} />
      )}
    </AuthGuard>
  )
}
