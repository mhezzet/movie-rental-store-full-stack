import { Tab, Tabs } from '@blueprintjs/core'
import React, { useState } from 'react'
import MoviesList from '../components/MoviesList'
import UsersList from '../components/UsersList'
import AdminGuard from '../guards/AdminGuard'
import Header from '../layouts/Header'
import styles from './AdminDashBoardPage.module.css'

export default function AdminDashBoardPage({ history }) {
  const [tab, setTab] = useState('users')

  const changeHandler = tab => setTab(tab)

  return (
    <AdminGuard history={history}>
      <Header history={history} />
      <div style={{ margin: '50px 50px 0 50px' }}>
        <Tabs
          large={true}
          vertical={true}
          id='TabsExample'
          onChange={changeHandler}
          selectedTabId={tab}
        >
          <Tab
            id='users'
            title='users'
            panelClassName={styles.panel}
            panel={<UsersList />}
          />
          <Tab
            id='movies'
            panelClassName={styles.panel}
            title='moves'
            panel={<MoviesList />}
          />
        </Tabs>
      </div>
    </AdminGuard>
  )
}
