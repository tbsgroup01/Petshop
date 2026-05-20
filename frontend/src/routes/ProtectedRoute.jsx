import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getDashboardPath, getStoredUser, isAuthenticated, normalizeRole } from '../utils/auth'

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation()
  const user = getStoredUser()
  const userRole = normalizeRole(user?.role)
  const normalizedAllowedRoles = allowedRoles.map(normalizeRole)

  if (!isAuthenticated() || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (normalizedAllowedRoles.length > 0 && !normalizedAllowedRoles.includes(userRole)) {
    return <Navigate to={getDashboardPath(userRole)} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
