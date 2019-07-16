import {
  Button,
  ControlGroup,
  FormGroup,
  HTMLSelect,
  InputGroup,
  Intent,
  NumericInput,
  Text
} from '@blueprintjs/core'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

const GENRE_OPTIONS = ['action', 'comedy', 'drama']

const localSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  releaseYear: yup.number().min(1850),
  numberInStock: yup
    .number()
    .min(0)
    .required(),
  rating: yup
    .number()
    .min(0)
    .max(10),
  poster: yup.string(),
  genre: yup.string().required()
})

export default function MovieForm({
  onSubmit,
  serverError,
  setView,
  type,
  currentMovie
}) {
  return (
    <Formik
      initialValues={
        type === 'update'
          ? currentMovie
          : {
              title: '',
              description: '',
              releaseYear: 1850,
              numberInStock: 0,
              rating: 0,
              poster: '',
              genre: 'action'
            }
      }
      validationSchema={localSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const cleansedValues = values
        if (values.releaseYear === '') cleansedValues.releaseYear = 0
        else if (values.rating === '') cleansedValues.rating = 0
        else if (values.numberInStock === '') cleansedValues.numberInStock = 0

        onSubmit(cleansedValues, setSubmitting, resetForm)
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start'
          }}
        >
          <Button
            icon='arrow-left'
            className='navButton'
            onClick={() => {
              resetForm()
              setView('movies')
            }}
            text='Back'
          />
          <Form style={{ width: 350, margin: 'auto' }}>
            <h2 style={{ textAlign: 'center' }} className='bp3-heading'>
              {type === 'create' ? 'Create A Movie' : 'Update The Movie'}
            </h2>
            <Field
              name='title'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='Title'
                  {...touched.title &&
                    errors.title && { helperText: errors.title }}
                >
                  <InputGroup
                    intent={
                      touched.title && errors.title
                        ? Intent.DANGER
                        : Intent.NONE
                    }
                    {...field}
                    placeholder='enter the title'
                  />
                </FormGroup>
              )}
            />
            <Field
              name='description'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='Description'
                  {...touched.description &&
                    errors.description && { helperText: errors.description }}
                >
                  <InputGroup
                    intent={
                      touched.description && errors.description
                        ? Intent.DANGER
                        : Intent.NONE
                    }
                    {...field}
                    placeholder='enter the description'
                  />
                </FormGroup>
              )}
            />
            <Field
              name='poster'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='Poster'
                  {...touched.poster &&
                    errors.poster && { helperText: errors.poster }}
                >
                  <InputGroup
                    intent={
                      touched.poster && errors.poster
                        ? Intent.DANGER
                        : Intent.NONE
                    }
                    {...field}
                    placeholder='enter the poster url'
                  />
                </FormGroup>
              )}
            />
            <Field
              name='genre'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='genre'
                  {...touched.genre &&
                    errors.genre && { helperText: errors.genre }}
                >
                  <ControlGroup fill={true} vertical={false}>
                    <HTMLSelect {...field} options={GENRE_OPTIONS} />
                  </ControlGroup>
                </FormGroup>
              )}
            />
            <Field
              name='releaseYear'
              render={({
                field,
                form: { touched, errors, isSubmitting },
                ...props
              }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='ReleaseYear'
                  {...touched.releaseYear &&
                    errors.releaseYear && { helperText: errors.releaseYear }}
                >
                  <NumericInput
                    {...field}
                    onValueChange={value => {
                      const e = { target: {} }
                      e.target.value = value
                      e.target.name = 'releaseYear'
                      field.onChange(e)
                    }}
                    intent={
                      touched.releaseYear && errors.releaseYear
                        ? Intent.DANGER
                        : Intent.NONE
                    }
                    placeholder='enter the Release Year'
                  />
                </FormGroup>
              )}
            />
            <Field
              name='numberInStock'
              render={({
                field,
                form: { touched, errors, isSubmitting },
                ...props
              }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='Number In Stock'
                  {...touched.numberInStock &&
                    errors.numberInStock && {
                      helperText: errors.numberInStock
                    }}
                >
                  <NumericInput
                    {...field}
                    onValueChange={value => {
                      const e = { target: {} }
                      e.target.value = value
                      e.target.name = 'numberInStock'
                      field.onChange(e)
                    }}
                    intent={
                      touched.numberInStock && errors.numberInStock
                        ? Intent.DANGER
                        : Intent.NONE
                    }
                    placeholder='enter the number In Stock'
                  />
                </FormGroup>
              )}
            />
            <Field
              name='rating'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <FormGroup
                  intent={Intent.DANGER}
                  disabled={isSubmitting}
                  label='Rating'
                  {...touched.rating &&
                    errors.rating && { helperText: errors.rating }}
                >
                  <NumericInput
                    {...field}
                    onValueChange={value => {
                      const e = { target: {} }
                      e.target.value = value
                      e.target.name = 'rating'
                      field.onChange(e)
                    }}
                    intent={
                      touched.rating && errors.rating
                        ? Intent.DANGER
                        : Intent.NONE
                    }
                    placeholder='enter the rating'
                  />
                </FormGroup>
              )}
            />

            {serverError && (
              <Text intent={Intent.DANGER}>{serverError.message}</Text>
            )}

            <Button
              type='submit'
              text={type === 'create' ? 'Add The Movie' : 'Update The Movie'}
              loading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  )
}
