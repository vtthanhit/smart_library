import { createContext, useReducer, useState } from 'react';
import axios from 'axios';

import { apiUrl, PAGY_PAGE_SIZE } from './constants';
import {
	ADD_CATEGORY,
	CATEGORIES_LOADED_SUCCESS,
	CATEGORIES_LOADED_FAIL,
	DELETE_CATEGORY,
	UPDATE_CATEGORY,
	ALL_CATEGORY,
} from '../contexts/constants';
import { categoryReducer } from '../reducers/categoryReducer';

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [categoryState, dispatch] = useReducer(categoryReducer, {
		count: 0,
		category: null,
		categories: [],
		amountBooks: [],
		categoriesLoading: true
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

	// Get all category with paginate
	const getCategories = async (from, to) => {
		try {
			const response = await axios.get(`${apiUrl}/category`);
			if (response.data.success) {
				const data = response.data.categories
				const count = data.length;
				const categories = data.slice(from, to);
				const amountBooks = response.data.amountBooks;
				dispatch({ type: CATEGORIES_LOADED_SUCCESS, payload: { count, categories, amountBooks } })
			}
		} catch (error) {
			dispatch({ type: CATEGORIES_LOADED_FAIL })
		}
	}

	// Get all category
	const getAllCategories = async () => {
		try {
			const response = await axios.get(`${apiUrl}/category`);
			if (response.data.success) {
				const categories = response.data.categories;
				dispatch({ type: ALL_CATEGORY, payload: { categories } })
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
				dispatch({ type: ADD_CATEGORY, payload: response.data.category })
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
			const response = await axios.delete(`${apiUrl}/category/${categoryId}`);
			if (response.data.success)
				dispatch({ type: DELETE_CATEGORY, payload: categoryId })
				return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Update category
	const updateCategory = async updatedCategory => {
		try {
      const response = await axios.put(`${apiUrl}/category/${updatedCategory._id}`, updatedCategory);
			if (response.data.success) {
				dispatch({ type: UPDATE_CATEGORY, payload: response.data.category })
				return response.data
			}
		} catch (error) {
			return error.response.data
			? error.response.data
			: { success: false, message: 'Server error' }
		}
	}

  const categoryContextData = {
		categoryState,
		getCategories,
		getAllCategories,
    addCategory,
		showToast,
		setShowToast,
		deleteCategory,
		updateCategory,
		pagination,
		setPagination,
	}

  return (
		<CategoryContext.Provider value={categoryContextData}>
			{children}
		</CategoryContext.Provider>
	)
}

export default CategoryContextProvider
