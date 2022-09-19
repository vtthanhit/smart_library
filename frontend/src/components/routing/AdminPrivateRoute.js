import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom';

import Loading from './../layout/Loading';
import { AuthContext } from './../../contexts/AuthContext';

const AdminPrivateRoute = () => {
  const {
		authState: { user, authLoading, isAuthenticated }
	} = useContext(AuthContext)

	if (authLoading)
		return (
			<Loading />
		)

	return (
    isAuthenticated && user.role === 'ADMIN' ? <Outlet/> : <Navigate to='/login'/>
	)
}

export default AdminPrivateRoute