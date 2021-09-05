import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { REGISTRATION } from '../constants/routs'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector(state => state.data)
  return (
    user && (
      <Route
        {...rest}
        render={props =>
          !user ? <Redirect to={REGISTRATION} /> : <Component {...props} />
        }
      />
    )
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default PrivateRoute
