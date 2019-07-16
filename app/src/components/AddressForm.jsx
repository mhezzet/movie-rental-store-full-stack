import { Button, FormGroup, InputGroup, Intent, Text } from '@blueprintjs/core'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

const localSchema = yup.object().shape({
  city: yup.string().required(),
  country: yup.string().required(),
  address: yup.string().required(),
  address2: yup.string(),
  district: yup.string().required(),
  postalCode: yup.string(),
  phone: yup.string().required()
})

export default function AddressForm({
  type,
  currentAddress,
  onSubmit,
  serverError,
  setView
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        padding: '20px 0px'
      }}
    >
      <Button
        style={{ margin: '1rem' }}
        onClick={() => setView('addresses')}
        text='back'
      />
      <Formik
        initialValues={
          type === 'update'
            ? currentAddress
            : {
                city: '',
                country: '',
                address: '',
                address2: '',
                district: '',
                postalCode: '',
                phone: ''
              }
        }
        validationSchema={localSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values, setSubmitting, resetForm)
        }}
      >
        {({ isSubmitting, resetForm }) => (
          <Form style={{ width: 350, margin: 'auto' }}>
            <h2 style={{ textAlign: 'center' }} className='bp3-heading'>
              {type === 'create' ? 'Create A Address' : 'Update The Address'}
            </h2>
            <Field
              name='city'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='City'
                  {...touched.city &&
                    errors.city && { helperText: errors.city }}
                >
                  <InputGroup
                    intent={
                      touched.city && errors.city ? Intent.DANGER : Intent.NONE
                    }
                    {...field}
                    placeholder='enter the city'
                  />
                </FormGroup>
              )}
            />
            <Field
              name='country'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='Country'
                  {...touched.country &&
                    errors.country && { helperText: errors.country }}
                >
                  <InputGroup
                    intent={
                      touched.country && errors.country
                        ? Intent.DANGER
                        : Intent.NONE
                    }
                    {...field}
                    placeholder='enter the country'
                  />
                </FormGroup>
              )}
            />
            <Field
              name='address'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='Address'
                  {...touched.address &&
                    errors.address && { helperText: errors.address }}
                >
                  <InputGroup
                    intent={
                      touched.address && errors.address
                        ? Intent.DANGER
                        : Intent.NONE
                    }
                    {...field}
                    placeholder='enter the address'
                  />
                </FormGroup>
              )}
            />
            <Field
              name='address2'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='Address 2'
                  {...touched.address2 &&
                    errors.address2 && { helperText: errors.address2 }}
                >
                  <InputGroup
                    intent={
                      touched.address2 && errors.address2
                        ? Intent.DANGER
                        : Intent.NONE
                    }
                    {...field}
                    placeholder='enter the address2'
                  />
                </FormGroup>
              )}
            />
            <Field
              name='district'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='District'
                  {...touched.district &&
                    errors.district && { helperText: errors.district }}
                >
                  <InputGroup
                    intent={
                      touched.district && errors.district
                        ? Intent.DANGER
                        : Intent.NONE
                    }
                    {...field}
                    placeholder='enter the district'
                  />
                </FormGroup>
              )}
            />
            <Field
              name='postalCode'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='Postal Code'
                  {...touched.postalCode &&
                    errors.postalCode && { helperText: errors.postalCode }}
                >
                  <InputGroup
                    intent={
                      touched.postalCode && errors.postalCode
                        ? Intent.DANGER
                        : Intent.NONE
                    }
                    {...field}
                    placeholder='enter the postalCode'
                  />
                </FormGroup>
              )}
            />
            <Field
              name='phone'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='Phone'
                  {...touched.phone &&
                    errors.phone && { helperText: errors.phone }}
                >
                  <InputGroup
                    intent={
                      touched.phone && errors.phone
                        ? Intent.DANGER
                        : Intent.NONE
                    }
                    {...field}
                    placeholder='enter the phone'
                  />
                </FormGroup>
              )}
            />

            {serverError && (
              <Text intent={Intent.DANGER}>{serverError.message}</Text>
            )}

            <Button
              type='submit'
              text={
                type === 'create' ? 'Add The Address' : 'Update The Address'
              }
              loading={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}
