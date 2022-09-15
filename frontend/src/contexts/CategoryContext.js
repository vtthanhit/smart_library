import { createContext, useReducer, useState } from 'react';
import axios from 'axios';

import { apiUrl } from './constants';
import {
	ADD_CATEGORY,
	CATEGORIES_LOADED_SUCCESS,
	CATEGORIES_LOADED_FAIL,
	DELETE_CATEGORY
} from '../contexts/constants';
import { categoryReducer } from '../reducers/categoryReducer';

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [categoryState, dispatch] = useReducer(categoryReducer, {
		category: null,
		categories: [],
		categoriesLoading: true
	});

	const [showToast, setShowToast] = useState({
		open: false,
		message: '',
		type: null
	});

	// Get all category
	const getCategories = async () => {
		try {
			const response = await axios.get(`${apiUrl}/category`);
			if (response.data.success) {
				dispatch({ type: CATEGORIES_LOADED_SUCCESS, payload: response.data.categories })
			}
		} catch (error) {
			dispatch({ type: CATEGORIES_LOADED_FAIL })
		}
	}

	// Add category
	const addCategory = async newCategory => {
		try {
			const response = await axios.post(`${apiUrl}/category`, newCategory)
			if (response.data.success) {
				dispatch({ type: ADD_CATEGORY, payload: response.data.post })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete category
	const deleteCategory = async categoryId => {
		try {
			const response = await axios.delete(`${apiUrl}/category/${categoryId}`)
			if (response.data.success)
				dispatch({ type: DELETE_CATEGORY, payload: categoryId })
		} catch (error) {
			console.log(error)
		}
	}

  const categoryContextData = {
		categoryState,
		getCategories,
    addCategory,
		showToast,
		setShowToast,
		deleteCategory,
	}

  return (
		<CategoryContext.Provider value={categoryContextData}>
			{children}
		</CategoryContext.Provider>
	)
}

export default CategoryContextProvider
