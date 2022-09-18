import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';

import { apiUrl, PAGY_PAGE_SIZE } from './constants';
import { bookReducer } from '../reducers/bookReducer';

import {
	ADD_BOOK,
} from '../contexts/constants';

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const [bookState, dispatch] = useReducer(bookReducer, {
		count: 0,
		book: null,
		books: [],
		booksLoading: true
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

  // Add book
	const addBook = async newBook => {
		try {
			const response = await axios.post(`${apiUrl}/book`, newBook)
			if (response.data.success) {
				dispatch({ type: ADD_BOOK, payload: response.data.book })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

  const bookContextData = {
    bookState,
    addBook,
		showToast,
		setShowToast,
	}

  return (
		<BookContext.Provider value={bookContextData}>
			{children}
		</BookContext.Provider>
	)
}

export default BookContextProvider