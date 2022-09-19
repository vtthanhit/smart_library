import { createContext, useState, useReducer } from 'react';
import axios from 'axios';

import { apiUrl, PAGY_PAGE_SIZE } from './constants';
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

  // Create request borrow
  const addRequest = async book => {
		console.log(book)
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

  const requestContextData = {
    requestState,
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