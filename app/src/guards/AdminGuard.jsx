import React from 'react'
import { GET_AUTH } from '../store'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading'
import { AppToaster } from '../components/Toaster'
import { Intent } from '@blueprintjs/core'

export default function AdminGuard(props) {
  const { data, loading } = useQuery(GET_AUTH)
  const newProps = Object.entries(props).reduce((newProps, [key, value]) => {
    if (key === 'children') return newProps
    return { ...newProps, [key]: value }
  }, {})

  if (!data.isAuth) {
    AppToaster.show({
      message: 'you are not authorized',
      timeout: 5000,
      icon: 'warning-sign',
      intent: Intent.DANGER
    })
    props.history.push('/auth')
    return <Loading />
  }

  const profile = data && JSON.parse(data.profile)
  const admin = profile && profile.roles.includes('admin')

  if (loading) return <Loading />
  if (!admin) {
    AppToaster.show({
      message: 'you are not an admin',
      timeout: 5000,
      icon: 'warning-sign',
      intent: Intent.DANGER
    })
    props.history.push('/')
    return <Loading />
  }

  return <>{React.cloneElement(<>{props.children}</>, newProps)}</>
}
