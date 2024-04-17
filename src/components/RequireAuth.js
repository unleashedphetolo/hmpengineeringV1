import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext)
  let location = useLocation()
  if (user) {
    return children
  } else {
    return <Navigate to='/login' state={{ from: location }} />
  }
}

export default RequireAuth
