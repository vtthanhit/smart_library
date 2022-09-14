import { createContext, useReducer, useState } from 'react';
import axios from 'axios';

import { apiUrl } from './constants';
import { ADD_CATEGORY } from '../contexts/constants';
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
	})

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

  const categoryContextData = {
    addCategory,
		showToast,
		setShowToast,
	}

  return (
		<CategoryContext.Provider value={categoryContextData}>
			{children}
		</CategoryContext.Provider>
	)
}

export default CategoryContextProvider