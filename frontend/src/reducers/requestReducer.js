import {
  ADD_REQUEST,
} from '../contexts/constants';

export const requestReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // case ALL_CATEGORY:
    //   return {
    //     ...state,
    //     categories: payload.categories,
    //   }

    // case CATEGORIES_LOADED_SUCCESS:
    //   return {
    //     ...state,
    //     categories: payload.categories,
    //     count: payload.count,
    //     categoriesLoading: false,
    //   }

    // case CATEGORIES_LOADED_FAIL:
    //   return {
    //     ...state,
    //     categories: [],
    //     categoriesLoading: false,
    //   }

    case ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, payload],
      }

    // case DELETE_CATEGORY:
    //   return {
    //     ...state,
    //     categories: state.categories.filter(category => category._id !== payload)
    //   }

    // case UPDATE_CATEGORY:
    //   const newCategories = state.categories.map(category =>
    //     category._id === payload._id ? payload : category
    //   )

    //   return {
    //     ...state,
    //     categories: newCategories
    //   }

    default:
      return state;
  }
}
