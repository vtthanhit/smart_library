import { createContext, useReducer, useState } from 'react';
import axios from 'axios';

import { apiUrl, PAGY_PAGE_SIZE } from './constants';
import {
	ADD_USER,
	USERS_LOADED_SUCCESS,
	USERS_LOADED_FAIL,
	DELETE_USER,
	UPDATE_USER,
	ALL_USER,
} from './constants';
import { userReducer } from '../reducers/userReducer';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {
		count: 0,
		user: null,
		users: [],
		usersLoading: true
	});

	const [showToast, setShowToast] = useState({
		open: false,
		message: '',
		type: null
	});

	const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: PAGY_PAGE_SIZE,
  });

	// Get all users
	const getUsers = async (from, to) => {
		try {
			const response = await axios.get(`${apiUrl}/user`);
			if (response.data.success) {
				const data = response.data.users
				const count = data.length;
				const users = data.slice(from, to);
				dispatch({ type: USERS_LOADED_SUCCESS, payload: { count, users } })
			}
		} catch (error) {
			dispatch({ type: USERS_LOADED_FAIL })
		}
	}

	const getAllUsers = async () => {
		try {
			const response = await axios.get(`${apiUrl}/user`);
			if (response.data.success) {
				const users = response.data.users
				dispatch({ type: ALL_USER, payload: { users } })
			}
		} catch (error) {
			dispatch({ type: USERS_LOADED_FAIL })
		}
	}


	// Add user
	const addUser = async newUser => {
		try {
			const response = await axios.post(`${apiUrl}/user`, newUser)
			if (response.data.success) {
				dispatch({ type: ADD_USER, payload: response.data.user })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete user
	const deleteUser = async userId => {
		try {
			const response = await axios.delete(`${apiUrl}/user/${userId}`);
			if (response.data.success)
				dispatch({ type: DELETE_USER, payload: userId })
				return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Update user
	const updateUser = async updatedUser => {
		try {
      const response = await axios.put(`${apiUrl}/user/${updatedUser._id}`, updatedUser);
			if (response.data.success) {
				dispatch({ type: UPDATE_USER, payload: response.data.user })
				return response.data
			}
		} catch (error) {
			return error.response.data
			? error.response.data
			: { success: false, message: 'Server error' }
		}
	}

  const userContextData = {
		userState,
		getUsers,
		getAllUsers,
    addUser,
		showToast,
		setShowToast,
		deleteUser,
		updateUser,
		pagination,
		setPagination,
	}

  return (
		<UserContext.Provider value={userContextData}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
