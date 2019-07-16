import { useQuery } from '@apollo/react-hooks'
import { Text } from '@blueprintjs/core'
import React from 'react'
import Loading from '../components/Loading'
import AuthGuard from '../guards/AuthGuard'
import Header from '../layouts/Header'
import { GET_AUTH } from '../store'

export default function UserProfilePage({ history }) {
  const { data, loading } = useQuery(GET_AUTH)
  if (loading) return <Loading />

  const profile = data && JSON.parse(data.profile)
  return (
    <AuthGuard history={history}>
      <Header history={history} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 30
        }}
      >
        <h2 className='bp3-heading'>
          {profile.firstName
            ? profile.firstName + ' ' + profile.lastName
            : profile.email}
        </h2>
        <img
          src={profile.picture}
          style={{ height: 250, maxWidth: 300, marginTop: 12 }}
          alt='profile'
        />
        <Text />
      </div>
    </AuthGuard>
  )
}
