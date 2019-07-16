import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Alignment,
  Button,
  Menu,
  Navbar,
  Popover,
  Position
} from '@blueprintjs/core'
import React from 'react'
import { GET_AUTH, RESET_AUTH } from '../store'

export default function Header({ history, ...props }) {
  const { data } = useQuery(GET_AUTH)
  const [resetAuth] = useMutation(RESET_AUTH)

  const profile = (data && JSON.parse(data.profile)) || {}
  const admin = profile.roles && profile.roles.includes('admin')

  return (
    <Navbar {...props}>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Movie Rental Store</Navbar.Heading>
        <Navbar.Divider />
        <Button
          onClick={() => history.push('/')}
          className='bp3-minimal'
          icon='home'
          text='Home'
        />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Popover
          content={
            <Menu>
              {admin ? (
                <Menu.Item
                  onClick={() => history.push('/admin')}
                  icon='dashboard'
                  text='dashboard'
                />
              ) : (
                <>
                  <Menu.Item
                    onClick={() => history.push('/profile')}
                    icon='person'
                    text='Profile'
                  />
                  <Menu.Item
                    onClick={() => history.push('/addresses')}
                    icon='map-marker'
                    text='Addresses'
                  />
                  <Menu.Item
                    onClick={() => history.push('/rentals')}
                    icon='download'
                    text='Rentals'
                  />
                </>
              )}
            </Menu>
          }
          position={Position.BOTTOM}
        >
          <Button
            style={{ marginLeft: '15px' }}
            className='bp3-minimal'
            icon='user'
            text={
              profile.firstName
                ? profile.firstName + ' ' + profile.lastName
                : profile.email
            }
          />
        </Popover>
        <Button
          style={{ marginLeft: '15px' }}
          onClick={() => resetAuth()}
          className='bp3-minimal'
          icon='log-out'
          text='LOGOUT'
        />
      </Navbar.Group>
    </Navbar>
  )
}
