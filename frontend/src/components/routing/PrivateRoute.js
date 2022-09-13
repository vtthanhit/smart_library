import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoutes = () => {
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	if (authLoading)
		return (
			console.log('addasdsad')
		)

	return (
    isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
	)
}

export default PrivateRoutes