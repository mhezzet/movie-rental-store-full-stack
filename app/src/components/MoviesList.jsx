import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Callout, Divider, Intent, Text } from '@blueprintjs/core'
import React, { useState } from 'react'
import { ADD_MOVIE, DELETE_MOVIE, MOVIES, UPDATE_MOVIE } from '../store'
import LoadingSmall from './LoadingSmall'
import MovieForm from './MovieForm'
import { AppToaster } from './Toaster'

export default function MoviesList() {
  const [view, setView] = useState('movies')
  const [currentMovie, setCurrentMovie] = useState({})
  const { data, error, networkStatus, refetch: refetchMovies } = useQuery(
    MOVIES
  )
  const [addMovie, { error: addMovieServerError }] = useMutation(ADD_MOVIE)
  const [updateMovie, { error: editMovieServerError }] = useMutation(
    UPDATE_MOVIE
  )
  const [deleteMovie, { loading: deleteMovieLoading }] = useMutation(
    DELETE_MOVIE
  )

  if (networkStatus === 1) return <LoadingSmall />
  if (error)
    return (
      <Callout intent={Intent.DANGER} icon='error'>
        {error.message}
      </Callout>
    )

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      {view === 'movies' && (
        <>
          <Button className='navButton' onClick={() => setView('create')}>
            Add a Movie
          </Button>
          <h2 className='bp3-heading' style={{ textAlign: 'center' }}>
            Movies List
          </h2>
          {data &&
            data.movies.map(movie => (
              <div key={movie.id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text>{movie.title}</Text>
                  <Button
                    onClick={() => {
                      setCurrentMovie({ ...movie, genre: movie.genre[0] })
                      setView('update')
                    }}
                    style={{ marginLeft: 'auto', marginRight: 10 }}
                    icon='edit'
                  />
                  <Button
                    onClick={() => {
                      setCurrentMovie(movie)
                      deleteMovie({ variables: { movieID: movie.id } })
                        .then(() => {
                          refetchMovies()
                          AppToaster.show({
                            message: 'movie deleted successfully',
                            timeout: 5000,
                            icon: 'tick',
                            intent: Intent.SUCCESS
                          })
                        })
                        .catch(err =>
                          AppToaster.show({
                            message: err.message,
                            timeout: 5000,
                            icon: 'warning-sign',
                            intent: Intent.DANGER
                          })
                        )
                        .finally(() => setCurrentMovie({}))
                    }}
                    loading={deleteMovieLoading && currentMovie.id === movie.id}
                    intent={Intent.DANGER}
                    icon='trash'
                  />
                </div>
                <Divider />
              </div>
            ))}
        </>
      )}
      {view === 'create' && (
        <MovieForm
          setView={setView}
          type='create'
          onSubmit={(values, setSubmitting, resetForm) =>
            addMovie({ variables: { movie: values } })
              .then(() => {
                refetchMovies()
                setSubmitting(false)
                resetForm()
                AppToaster.show({
                  message: 'movie created successfully',
                  timeout: 5000,
                  icon: 'tick',
                  intent: Intent.SUCCESS
                })
                setView('movies')
              })
              .catch(err =>
                AppToaster.show({
                  message: err.message,
                  timeout: 5000,
                  icon: 'warning-sign',
                  intent: Intent.DANGER
                })
              )
          }
          serverError={addMovieServerError}
        />
      )}
      {view === 'update' && (
        <MovieForm
          currentMovie={currentMovie}
          type='update'
          setView={setView}
          onSubmit={(values, setSubmitting, resetForm) => {
            const theNewValues = Object.entries(values).reduce(
              (total, [key, value]) =>
                key === 'id' || key === '__typename'
                  ? total
                  : {
                      ...total,
                      [key]: value
                    },
              {}
            )
            updateMovie({
              variables: { movie: theNewValues, movieID: values.id }
            })
              .then(() => {
                refetchMovies()
                setSubmitting(false)
                resetForm()
                AppToaster.show({
                  message: 'movie updated successfully',
                  timeout: 5000,
                  icon: 'tick',
                  intent: Intent.SUCCESS
                })
                setView('movies')
              })
              .catch(err => {
                AppToaster.show({
                  message: err.message,
                  timeout: 5000,
                  icon: 'warning-sign',
                  intent: Intent.DANGER
                })
              })
              .finally(() => setCurrentMovie({}))
          }}
          serverError={editMovieServerError}
        />
      )}
    </div>
  )
}
