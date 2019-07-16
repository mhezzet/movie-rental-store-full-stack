import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Callout, Divider, Intent, Text } from '@blueprintjs/core'
import React, { useState } from 'react'
import { DELETE_USER, USERS } from '../store/actions/remote'
import LoadingSmall from './LoadingSmall'
import { AppToaster } from './Toaster'
import style from './UsersList.module.css'

export default function UsersList() {
  const { data, error, networkStatus } = useQuery(USERS)
  const [deleteUser] = useMutation(DELETE_USER)
  const [currentButton, setCurrentButton] = useState('')

  if (networkStatus === 1) return <LoadingSmall />

  if (error)
    return (
      <Callout intent={Intent.DANGER} icon='error'>
        {error.message}
      </Callout>
    )

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      {data.users.map(user => (
        <div key={user.id}>
          <div className={style.listItem}>
            <img
              style={{ height: 50, marginRight: 10 }}
              src={user.picture}
              alt='personal'
            />
            <Text>
              {user.firstName
                ? user.firstName + ' ' + user.lastName
                : user.email}
            </Text>
            <Button
              onClick={() => {
                setCurrentButton(user.id)
                deleteUser({
                  variables: { userID: user.id },
                  refetchQueries: ['users']
                })
                  .then(() =>
                    AppToaster.show({
                      message: 'the user has been deleted',
                      timeout: 5000,
                      icon: 'tick',
                      intent: Intent.SUCCESS
                    })
                  )
                  .catch(err =>
                    AppToaster.show({
                      message: err.message,
                      timeout: 5000,
                      icon: 'warning-sign',
                      intent: Intent.DANGER
                    })
                  )
                  .finally(() => setCurrentButton(''))
              }}
              loading={currentButton === user.id}
              style={{ marginLeft: 'auto' }}
              intent={Intent.DANGER}
              icon='trash'
            />
          </div>
          <Divider />
        </div>
      ))}
    </div>
  )
}
