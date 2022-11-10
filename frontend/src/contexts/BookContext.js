import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';

import { 
	apiUrl, 
	PAGY_PAGE_SIZE, 
	BOOKS_LOADED_SUCCESS,
	BOOKS_LOADED_FAIL,
	DELETE_BOOK,
	UPDATE_BOOK,
	ALL_BOOK,
	FIND_BOOK,
} from './constants';
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

	// Get all book with paginate
	const getBooks = async (query, from, to) => {
		try {
			const response = await axios.get(`${apiUrl}/book?q=${query}`);
			if (response.data.success) {
				const data = response.data.books
				const count = data.length;
				const books = data.slice(from, to);
				dispatch({ type: BOOKS_LOADED_SUCCESS, payload: { count, books } })
			}
		} catch (error) {
			dispatch({ type: BOOKS_LOADED_FAIL })
		}
	}

	const getAllBooks = async () => {
		try {
			const response = await axios.get(`${apiUrl}/book`);
			if (response.data.success) {
				const books = response.data.books
				dispatch({ type: ALL_BOOK, payload: { books } })
			}
		} catch (error) {
			dispatch({ type: BOOKS_LOADED_FAIL })
		}
	}

	// Find book
	const findBook = async (bookId) => {
		try {
			const response = await axios.get(`${apiUrl}/book/${bookId}`);
			if (response.data.success) {
				dispatch({ type: FIND_BOOK, payload: response.data.book })
			}
		} catch (error) {
			dispatch({ type: BOOKS_LOADED_FAIL })
		}
	}

	// Delete book
	const deleteBook = async bookId => {
		try {
			const response = await axios.delete(`${apiUrl}/book/${bookId}`);
			if (response.data.success)
				dispatch({ type: DELETE_BOOK, payload: bookId })
				return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Update book
	const updateBook = async (updatedBook, bookId) => {
		try {
			const response = await axios.put(`${apiUrl}/book/${bookId}`, updatedBook);
			if (response.data.success) {
				dispatch({ type: UPDATE_BOOK, payload: response.data.book })
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
		deleteBook,
		getBooks,
		getAllBooks,
		findBook,
		updateBook,
		showToast,
		setShowToast,
		pagination,
		setPagination,
	}

  return (
		<BookContext.Provider value={bookContextData}>
			{children}
		</BookContext.Provider>
	)
}

export default BookContextProvider
