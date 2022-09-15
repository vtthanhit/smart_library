import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../layout/Loading';

const PrivateRoutes = () => {
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	if (authLoading)
		return (
			<Loading />
		)

	return (
    isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
	)
}

export default PrivateRoutes
