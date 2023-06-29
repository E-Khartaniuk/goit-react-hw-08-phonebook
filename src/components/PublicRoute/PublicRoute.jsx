import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const location = useLocation();
  const isAuth = useSelector(state => state.auth.access_token);
  return !isAuth ? children : <Navigate to={location.state ?? '/'} />;
}
