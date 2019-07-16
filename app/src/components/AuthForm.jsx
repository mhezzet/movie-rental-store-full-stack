import { Button, FormGroup, InputGroup, Intent, Text } from '@blueprintjs/core'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

const localSchema = yup.object().shape({
  email: yup
    .string()
    .email('invalid email')
    .required(),
  password: yup
    .string()
    .min(4, 'too short')
    .required()
})

export default function AuthForm({ onSubmit, type, serverError }) {
  return (
    <Formik
      style={{ width: 600 }}
      initialValues={{ email: '', password: '' }}
      validationSchema={localSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            name='email'
            render={({ field, form: { touched, errors, isSubmitting } }) => (
              <FormGroup
                intent={Intent.DANGER}
                disabled={isSubmitting}
                label='Email'
                {...touched.email &&
                  errors.email && { helperText: errors.email }}
              >
                <InputGroup
                  intent={
                    touched.email && errors.email ? Intent.DANGER : Intent.NONE
                  }
                  {...field}
                  type='email'
                  placeholder='enter the email'
                />
              </FormGroup>
            )}
          />
          <Field
            name='password'
            render={({ field, form: { touched, errors, isSubmitting } }) => (
              <FormGroup
                intent={Intent.DANGER}
                disabled={isSubmitting}
                label='Password'
                {...touched.password &&
                  errors.password && { helperText: errors.password }}
              >
                <InputGroup
                  intent={
                    touched.password && errors.password
                      ? Intent.DANGER
                      : Intent.NONE
                  }
                  {...field}
                  type='password'
                  placeholder='enter the password'
                />
              </FormGroup>
            )}
          />
          {serverError && (
            <Text intent={Intent.DANGER}>
              {serverError.graphQLErrors[0].message}
            </Text>
          )}

          <Button type='submit' text={type} loading={isSubmitting} />
        </Form>
      )}
    </Formik>
  )
}
