import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import LoginForm from '../../components/auth/LoginForm';
import { AuthContext } from '../../contexts/AuthContext';

function Login() {
  const { 
    authState: { authLoading, isAuthenticated, user }, 
  } = useContext(AuthContext);

  if (authLoading) {
    console.log('Dang tai');
  }
  else if (isAuthenticated && user.role === 'STUDENT') {
    console.log(isAuthenticated)
    return <Navigate to='/index' />;
  }
  else if (isAuthenticated && user.role === 'ADMIN') {
    console.log(isAuthenticated)
    return <Navigate to='/admin' />;
  }
  return (
    <LoginForm />
  )
}

export default Login