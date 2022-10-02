import { createContext, useState, useReducer } from 'react';
import axios from 'axios';

import {
	apiUrl,
	PAGY_PAGE_SIZE,
	REQUESTS_BORROW_LOADED_SUCCESS,
	REQUESTS_BORROW_LOADED_FAIL,
	REQUESTS_RETURN_LOADED_SUCCESS,
	REQUESTS_RETURN_LOADED_FAIL,
	DELETE_REQUEST,
	UPDATE_REQUEST,
} from './constants';

import {
  ADD_REQUEST,
} from '../contexts/constants';
import { requestReducer } from './../reducers/requestReducer';

export const RequestContext = createContext();
const RequestContextProvider = ({ children }) => {
  const [requestState, dispatch] = useReducer(requestReducer, {
		count: 0,
		request: null,
		requests: [],
		requestsLoading: true
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

  // User get request BORROW
	const getUserRequestBorrow = async (from, to) => {
		try {
			const response = await axios.get(`${apiUrl}/request/borrow`);
			if (response.data.success) {
				const data = response.data.requests
				const count = data.length;
				const requests = data.slice(from, to);
				dispatch({ type: REQUESTS_BORROW_LOADED_SUCCESS, payload: { count, requests } })
			}
		} catch (error) {
			dispatch({ type: REQUESTS_BORROW_LOADED_FAIL })
		}
	}

	// User get request RETURN
	const getUserRequestReturn = async (from, to) => {
		try {
			const response = await axios.get(`${apiUrl}/request/return`);
			if (response.data.success) {
				const data = response.data.requests
				const count = data.length;
				const requests = data.slice(from, to);
				dispatch({ type: REQUESTS_RETURN_LOADED_SUCCESS, payload: { count, requests } })
			}
		} catch (error) {
			dispatch({ type: REQUESTS_RETURN_LOADED_FAIL })
		}
	}

	// User get request RETURN
	const getAdminRequestReturn = async (from, to) => {
		try {
			const response = await axios.get(`${apiUrl}/request/admin/return`);
			if (response.data.success) {
				const data = response.data.requests
				const count = data.length;
				const requests = data.slice(from, to);
				dispatch({ type: REQUESTS_RETURN_LOADED_SUCCESS, payload: { count, requests } })
			}
		} catch (error) {
			dispatch({ type: REQUESTS_RETURN_LOADED_FAIL })
		}
	}

	// User get request BORROW
	const getAdminRequestBorrow = async (from, to) => {
		try {
			const response = await axios.get(`${apiUrl}/request/admin/borrow`);
			if (response.data.success) {
				const data = response.data.requests
				const count = data.length;
				const requests = data.slice(from, to);
				dispatch({ type: REQUESTS_BORROW_LOADED_SUCCESS, payload: { count, requests } })
			}
		} catch (error) {
			dispatch({ type: REQUESTS_BORROW_LOADED_FAIL })
		}
	}

  // Create request borrow
  const addRequest = async book => {
    try {
			const response = await axios.post(`${apiUrl}/request/borrow`, book);
			console.log(response);
			if (response.data.success) {
				dispatch({ type: ADD_REQUEST, payload: response.data.request })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
  }

	const deleteRequestBorrow = async requestId => {
		try {
			const response = await axios.delete(`${apiUrl}/request/borrow/${requestId}`);
			if (response.data.success)
				dispatch({ type: DELETE_REQUEST, payload: requestId })
				return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Update request
	const updateRequest = async (requestId, updatedRequest) => {
		try {
			const response = await axios.put(`${apiUrl}/request/borrow/${requestId}`, updatedRequest);
			if (response.data.success) {
				dispatch({ type: UPDATE_REQUEST, payload: response.data.request })
				return response.data
			}
		} catch (error) {
			return error.response.data
			? error.response.data
			: { success: false, message: 'Server error' }
		}
	}	

	// Update request
	const adminUpdateRequest = async (requestId, updatedRequest) => {
		try {
			const response = await axios.put(`${apiUrl}/request/admin/${requestId}`, updatedRequest);
			if (response.data.success) {
				dispatch({ type: UPDATE_REQUEST, payload: response.data.request })
				return response.data
			}
		} catch (error) {
			return error.response.data
			? error.response.data
			: { success: false, message: 'Server error' }
		}
	}	

  const requestContextData = {
    requestState,
		getUserRequestBorrow,
		deleteRequestBorrow,
		getUserRequestReturn,
		getAdminRequestReturn,
		getAdminRequestBorrow,
		updateRequest,
		adminUpdateRequest,
		addRequest,
		showToast,
		setShowToast,
		pagination,
		setPagination,
	}

  return (
		<RequestContext.Provider value={requestContextData}>
			{children}
		</RequestContext.Provider>
	)
}

export default RequestContextProvider
