import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Divider, Intent, Text } from '@blueprintjs/core';
import React, { useState } from 'react';
import AddressForm from '../components/AddressForm';
import LoadingSmall from '../components/LoadingSmall';
import { AppToaster } from '../components/Toaster';
import AuthGuard from '../guards/AuthGuard';
import Header from '../layouts/Header';
import { ADDRESSES, ADD_AN_ADDRESS, DELETE_AN_ADDRESS, UPDATE_AN_ADDRESS } from '../store';

export default function UserAddressesPage({ history }) {
  const [view, setView] = useState('addresses')
  const [currentAddress, setCurrentAddress] = useState({})
  const { data, networkStatus, refetch: refetchAddresses } = useQuery(ADDRESSES)
  const [addAddress, { error: addAddressError }] = useMutation(ADD_AN_ADDRESS)
  const [deleteAnAddress, { loading: deleteAddressLoading }] = useMutation(
    DELETE_AN_ADDRESS
  )
  const [updateAnAddress, { error: updateAddtessError }] = useMutation(
    UPDATE_AN_ADDRESS
  )

  return (
    <AuthGuard history={history}>
      <Header history={history} />
      {view === 'addresses' && (
        <div style={{ overflow: 'auto' }}>
          <Button
            style={{ margin: '1rem' }}
            onClick={() => setView('create')}
            text='add new address'
          />
          {networkStatus === 1 && <LoadingSmall />}

          {data && data.addresses && (
            <h2 style={{ textAlign: 'center' }} className='bp3-heading'>
              {data && data.addresses && data.addresses.length === 0
                ? 'you have no addresses'
                : 'Addresses List'}
            </h2>
          )}
          {data &&
            data.addresses &&
            data.addresses.map(address => (
              <div style={{ maxWidth: 600, margin: 'auto' }} key={address.id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text>{address.address}</Text>
                  <Button
                    onClick={() => {
                      setCurrentAddress(address)
                      setView('update')
                    }}
                    style={{ marginLeft: 'auto', marginRight: 10 }}
                    icon='edit'
                  />
                  <Button
                    onClick={() => {
                      setCurrentAddress(address)
                      deleteAnAddress({ variables: { addressID: address.id } })
                        .then(() => {
                          refetchAddresses()
                          setCurrentAddress({})
                          AppToaster.show({
                            message: 'address deleted successfully',
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
                        .finally(() => setCurrentAddress({}))
                    }}
                    loading={
                      deleteAddressLoading && currentAddress.id === address.id
                    }
                    intent={Intent.DANGER}
                    icon='trash'
                  />
                </div>
                <Divider />
              </div>
            ))}
        </div>
      )}
      {view === 'create' && (
        <>
          <AddressForm
            setView={setView}
            onSubmit={(values, setSubmitting, resetForm) =>
              addAddress({
                variables: { address: values }
              }).then(() => {
                resetForm()
                setCurrentAddress({})
                setSubmitting(false)
                setView('addresses')
                refetchAddresses()
                AppToaster.show({
                  message: 'Address created successfully',
                  timeout: 5000,
                  icon: 'tick',
                  intent: Intent.SUCCESS
                })
              })
            }
            type='create'
            serverError={addAddressError}
          />
        </>
      )}
      {view === 'update' && (
        <>
          <AddressForm
            currentAddress={currentAddress}
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

              updateAnAddress({
                variables: {
                  address: theNewValues,
                  addressID: currentAddress.id
                }
              })
                .then(() => {
                  resetForm()
                  setSubmitting(false)
                  setView('addresses')
                  setCurrentAddress({})
                  refetchAddresses()
                  AppToaster.show({
                    message: 'Address updated successfully',
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
            }}
            type='update'
            serverError={updateAddtessError}
          />
        </>
      )}
    </AuthGuard>
  )
}
