import { createContext, useState, useReducer } from 'react';
import axios from 'axios';

import {
	apiUrl,
	PAGY_PAGE_SIZE,
	REQUESTS_BORROW_LOADED_SUCCESS,
	REQUESTS_BORROW_LOADED_FAIL,
	DELETE_REQUEST,
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

  const requestContextData = {
    requestState,
		getUserRequestBorrow,
		deleteRequestBorrow,
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
