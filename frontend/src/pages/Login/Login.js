import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import LoginForm from '../../components/auth/LoginForm';
import Loading from '../../components/layout/Loading';
import { AuthContext } from '../../contexts/AuthContext';

function Login() {
  const {
    authState: { authLoading, isAuthenticated, user },
  } = useContext(AuthContext);

  if (authLoading) {
    return <Loading />
  }
  else if (isAuthenticated && user.role === 'STUDENT') {
    return <Navigate to='/index' />;
  }
  else if (isAuthenticated && user.role === 'ADMIN') {
    return <Navigate to='/admin' />;
  }
  return (
    <LoginForm />
  )
}

export default Login
