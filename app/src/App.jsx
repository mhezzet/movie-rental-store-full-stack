import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AdminDashBoardPage from './pages/AdminDashBoardPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import NotFound from './pages/NotFound'
import UserAddressesPage from './pages/UserAddressesPage'
import UserProfilePage from './pages/UserProfilePage'
import UserRentalPage from './pages/UserRentalPage'

export default function App() {
  return (
    <div
      style={{
        backgroundColor: '#30404D',
        minHeight: '100vh',
        overflow: 'auto'
      }}
      className='bp3-dark'
    >
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/auth' component={LoginPage} />
          <Route exact path='/admin' component={AdminDashBoardPage} />
          <Route exact path='/profile' component={UserProfilePage} />
          <Route exact path='/addresses' component={UserAddressesPage} />
          <Route exact path='/rentals' component={UserRentalPage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
