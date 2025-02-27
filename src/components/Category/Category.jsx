import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { withTranslation } from 'react-i18next'

import { Box, Typography, Input, Button, Alert } from '@mui/material'

import { editCategory, createCategory } from '../../apollo'
import useGlobalStyles from '../../utils/globalStyles'
import useStyles from '../styles'

const CREATE_CATEGORY = gql`
  ${createCategory}
`
const EDIT_CATEGORY = gql`
  ${editCategory}
`

function Category(props) {
  const mutation = props.category ? EDIT_CATEGORY : CREATE_CATEGORY
  const [mainError, mainErrorSetter] = useState('')
  const [success, successSetter] = useState('')
  const [category, setCategory] = useState(
    props.category ? props.category.title : ''
  )
  const restaurantId = localStorage.getItem('restaurantId')

  const onCompleted = data => {
    const message = props.category
      ? 'Category updated successfully'
      : 'Category added successfully'
    successSetter(message)
    mainErrorSetter('')
    setCategory('')
    setTimeout(hideAlert, 5000)
  }
  const onError = error => {
    const message = `Action failed. Please Try again ${error}`
    successSetter('')
    mainErrorSetter(message)
    setTimeout(hideAlert, 5000)
  }
  const [mutate, { loading }] = useMutation(mutation, { onError, onCompleted })
  const hideAlert = () => {
    mainErrorSetter('')
    successSetter('')
  }
  const { t } = props
  const classes = useStyles()
  const globalClasses = useGlobalStyles()

  return (
    <Box container className={classes.container}>
      <Box className={classes.flexRow}>
        <Box
          item
          className={props.category ? classes.headingBlack : classes.heading2}>
          <Typography variant="h6" className={classes.textWhite}>
            {props.category ? t('Edit Category') : t('Add Category')}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.form}>
        <form>
          <Box>
            <Typography className={classes.labelText}>Name</Typography>
            <Input
              style={{ marginTop: -1 }}
              id="input-category"
              name="input-category"
              placeholder="Category i.e Breakfast"
              type="text"
              defaultValue={category}
              onChange={e => {
                setCategory(e.target.value)
              }}
              disableUnderline
              className={globalClasses.input}
            />
          </Box>
          <Box>
            <Button
              className={globalClasses.button}
              disabled={loading}
              onClick={async e => {
                e.preventDefault()
                if (!loading) {
                  mutate({
                    variables: {
                      category: {
                        _id: props.category ? props.category._id : '',
                        title: category,
                        restaurant: restaurantId
                      }
                    }
                  })
                }
              }}>
              SAVE
            </Button>
          </Box>
          <Box mt={2}>
            {success && (
              <Alert
                className={globalClasses.alertSuccess}
                variant="filled"
                severity="success">
                {success}
              </Alert>
            )}
            {mainError && (
              <Alert
                className={globalClasses.alertError}
                variant="filled"
                severity="error">
                {mainError}
              </Alert>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default withTranslation()(Category)
