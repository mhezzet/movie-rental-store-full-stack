import { useApolloClient } from '@apollo/react-hooks'
import { Button, Divider, Intent, Text } from '@blueprintjs/core'
import React from 'react'
import { MAKE_RENTAL, NEW_INVENTORY } from '../store'
import { AppToaster } from './Toaster'

export default function Basket({ setView, basket, setBasket }) {
  const { mutate } = useApolloClient()

  const checkout = () => {
    mutate({
      mutation: NEW_INVENTORY,
      variables: { movies: basket.map(movie => movie.id) }
    })
      .then(data =>
        mutate({
          mutation: MAKE_RENTAL,
          variables: {
            inventoryID: data.data.newInventory.id,
            returnDate: new Date()
          }
        })
      )
      .then(() => {
        AppToaster.show({
          message: 'rent completed successfully ',
          timeout: 5000,
          icon: 'tick',
          intent: Intent.SUCCESS
        })
        setView('gallery')
        setBasket([])
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

  return (
    <div>
      <Button
        style={{ margin: 30 }}
        onClick={() => setView('gallery')}
        text='BACK'
      />
      {basket.map(movie => (
        <div key={movie.id}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              margin: 'auto',
              width: 500,
              padding: '1rem'
            }}
          >
            <img
              src={movie.poster}
              style={{ maxHeight: 100, marginRight: 40 }}
              alt='movie'
            />
            <Text>{movie.title}</Text>
          </div>
          <Divider style={{ width: 400, margin: 'auto' }} />
        </div>
      ))}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button onClick={checkout} style={{ margin: 50 }} text='CHECKOUT' />
      </div>
    </div>
  )
}
