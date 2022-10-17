import { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants';
import { authReducer } from '../reducers/authReducer';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null,
	});

	const [showToast, setShowToast] = useState({
		open: false,
		message: '',
		type: null
	});

	const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
		}

		try {
			const response = await axios.get(`${apiUrl}/auth`);
			if (response.data.success) {
				dispatch({
					type: 'SET_AUTH',
					payload: {
						isAuthenticated: true,
						user: response.data.user,
					}
				});
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
			setAuthToken(null);
			dispatch({
				type: 'SET_AUTH',
				payload: {
					isAuthenticated: false,
					user: null,
				}
			});
		}
	}

	useEffect(() => {
		loadUser();
		return () => {
		};
	}, []);

	const loginUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/login`, userForm);
			if (response.data.success) {
				localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
			}
			await loadUser();
			return response.data;
		} catch (error) {
			if (error.response.data) return error.response.data;
			else return { success: false, message: error.message }
		}
	}

	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
		dispatch({
			type: 'SET_AUTH',
			payload: {
				isAuthenticated: false,
				user: null,
			}
		});
	}

	const updateProfile = async (profileData) => {
		try {
			const response = await axios.put(`${apiUrl}/auth/`, profileData);
			dispatch({
				type: 'SET_AUTH',
				payload: { 
					isAuthenticated: true,
					user: response.data.user,
				}
			});
			return response.data;
		} catch (error) {
			if (error.response.data) return error.response.data;
			else return { success: false, message: error.message }
		}
	}

	const authContextData = { 
		loginUser, 
		logoutUser, 
		authState,  
		updateProfile,
		showToast,
		setShowToast,
	};

	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider;
