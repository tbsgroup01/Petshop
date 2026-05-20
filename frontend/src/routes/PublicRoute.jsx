import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getDashboardPath, isAuthenticated, getStoredUser } from '../utils/auth'

const PublicRoute = () => {
  const user = getStoredUser()
  if (isAuthenticated() && user) {
    return <Navigate to={getDashboardPath(user.role)} replace />
  }

  return <Outlet />
}

export default PublicRoute
