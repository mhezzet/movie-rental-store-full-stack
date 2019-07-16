import { useMutation } from '@apollo/react-hooks'
import {
  Callout,
  Card,
  Elevation,
  Intent,
  Menu,
  Tab,
  Tabs
} from '@blueprintjs/core'
import React, { useState } from 'react'
import { FacebookProvider, LoginButton } from 'react-facebook'
import GoogleAuthorize from 'react-google-authorize'
import AuthForm from '../components/AuthForm'
import { AppToaster } from '../components/Toaster'
import NotAuthGuard from '../guards/NotAuthGuard'
import {
  LOGIN_LOCAL,
  REGISTER_FACEBOOK,
  REGISTER_GOOGLE,
  REGISTER_LOCAL,
  SET_AUTH
} from '../store'
import styles from './LoginPage.module.css'

export default function LoginPage({ history }) {
  const [currentTab, setCurrentTab] = useState('login')
  const [loginLocal, { error: loginLocalError }] = useMutation(LOGIN_LOCAL)
  const [registerLocal, { error: registerLocalError }] = useMutation(
    REGISTER_LOCAL
  )
  const [setAuth] = useMutation(SET_AUTH)
  const [registerGoogle] = useMutation(REGISTER_GOOGLE)
  const [registerFacebook] = useMutation(REGISTER_FACEBOOK)

  const facebookAuthCallback = async response => {
    const accessToken =
      (response.tokenDetail && response.tokenDetail.accessToken) || null
    try {
      const { data } = await registerFacebook({
        variables: { authToken: accessToken }
      })
      await setAuth({ variables: data.registerFaceBook })
      AppToaster.show({
        message: 'you have been successfully login',
        timeout: 5000,
        icon: 'tick',
        intent: Intent.SUCCESS
      })
      history.push('/')
    } catch (err) {
      AppToaster.show({
        message: err.message,
        timeout: 5000,
        icon: 'warning-sign',
        intent: Intent.DANGER
      })
    }
  }

  const googleAuthCallback = async response => {
    const accessToken = response.access_token || null

    try {
      const { data } = await registerGoogle({
        variables: { authToken: accessToken }
      })
      await setAuth({ variables: data.registerGoogle })
      AppToaster.show({
        message: 'you have been successfully login',
        timeout: 5000,
        icon: 'tick',
        intent: Intent.SUCCESS
      })
      history.push('/')
    } catch (err) {
      AppToaster.show({
        message: err.message,
        timeout: 5000,
        icon: 'warning-sign',
        intent: Intent.DANGER
      })
    }
  }

  const tabChangeHandler = tab => setCurrentTab(tab)

  return (
    <NotAuthGuard history={history}>
      <div className={styles.container}>
        <h1 className={`${styles.header} bp3-heading`}>Movies Rental Store</h1>
        <Card className={styles.formCard} elevation={Elevation.TWO}>
          <Tabs onChange={tabChangeHandler} selectedTabId={currentTab}>
            <Tab
              id='login'
              title='Login'
              panel={
                <>
                  <Callout
                    className='bp3-code'
                    style={{ marginBottom: 10 }}
                    intent={Intent.PRIMARY}
                    icon='info-sign'
                  >
                    to login as admin use
                    <br />
                    email: mhezzet@gmail.com
                    <br />
                    password: 1234
                  </Callout>
                  <AuthForm
                    serverError={loginLocalError}
                    type='login'
                    onSubmit={async (values, setSubmitting) => {
                      try {
                        const { data } = await loginLocal({ variables: values })
                        await setAuth({ variables: data.loginLocal })
                        setSubmitting(false)
                        AppToaster.show({
                          message: 'you have been successfully login',
                          timeout: 5000,
                          icon: 'tick',
                          intent: Intent.SUCCESS
                        })
                        history.push('/')
                      } catch (err) {
                        setSubmitting(false)
                      }
                    }}
                  />
                </>
              }
            />
            <Tab
              id='register'
              title='Register'
              panel={
                <AuthForm
                  serverError={registerLocalError}
                  type='register'
                  onSubmit={async (values, setSubmitting) => {
                    try {
                      const { data } = await registerLocal({
                        variables: values
                      })
                      await setAuth({ variables: data.registerLocal })
                      setSubmitting(false)
                      AppToaster.show({
                        message: 'you have been successfully registerd',
                        timeout: 5000,
                        icon: 'tick',
                        intent: Intent.SUCCESS
                      })
                      history.push('/')
                    } catch (err) {
                      setSubmitting(false)
                    }
                  }}
                />
              }
            />

            <Tabs.Expander />
          </Tabs>

          <Menu.Divider className={styles.divider} />
          <div className={styles.outhBox}>
            <FacebookProvider appId='1110178902497821'>
              <LoginButton
                className={`bp3-button ${styles.outhButton}`}
                scope='email'
                onCompleted={facebookAuthCallback}
              >
                continue with Facebook
              </LoginButton>
            </FacebookProvider>

            <GoogleAuthorize
              className={`bp3-button ${styles.outhButton}`}
              clientId='206287665550-ar9bia38bnlpqf72paels7lrfa3p2q2q.apps.googleusercontent.com'
              buttonText='continue with Google'
              onSuccess={googleAuthCallback}
            />
          </div>
        </Card>
      </div>
    </NotAuthGuard>
  )
}
