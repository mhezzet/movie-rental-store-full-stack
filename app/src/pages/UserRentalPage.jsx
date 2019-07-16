import { useQuery } from '@apollo/react-hooks'
import { Callout, Card, Elevation, Intent } from '@blueprintjs/core'
import React from 'react'
import Loading from '../components/Loading'
import AuthGuard from '../guards/AuthGuard'
import Header from '../layouts/Header'
import { RENTALS_BY_USER } from '../store'

export default function UserRentalPage({ history }) {
  const { data, loading, error } = useQuery(RENTALS_BY_USER)

  if (loading) return <Loading />

  if (error)
    return (
      <Callout intent={Intent.DANGER} icon='error'>
        {error.message}
      </Callout>
    )

  return (
    <AuthGuard history={history}>
      <Header history={history} />
      <h2
        style={{ textAlign: 'center', margin: '1rem' }}
        className='bp3-heading'
      >
        Rentals
      </h2>
      <div style={{ width: 400, margin: 'auto' }}>
        {data.rentalsByUser && (
          <h6
            style={{ textAlign: 'center', margin: '1rem' }}
            className='bp3-heading'
          >
            you dont have rentals
          </h6>
        )}
        {data.rentalsByUser.map(rental => (
          <Card
            elevation={Elevation.ONE}
            style={{ margin: 20 }}
            key={rental.id}
          >
            <div>
              <div className='bp3-text-overflow-ellipsis bp3-ui-text'>
                <span style={{ marginRight: 10 }}>
                  {new Date(rental.rentalDate).toLocaleDateString()}
                </span>
                <span>
                  {rental.inventory.movies.map(movie => movie.title + ', ')}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AuthGuard>
  )
}
