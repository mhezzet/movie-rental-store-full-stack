import React from 'react'
import { GET_AUTH } from '../store'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading'

export default function AuthGuard(props) {
  const { data, loading } = useQuery(GET_AUTH)
  const newProps = Object.entries(props).reduce((newProps, [key, value]) => {
    if (key === 'children') return newProps
    return { ...newProps, [key]: value }
  }, {})

  if (loading) return <Loading />

  if (!data.isAuth) {
    props.history.push('/auth')
    return <Loading />
  }

  return <>{React.cloneElement(<>{props.children}</>, newProps)}</>
}
