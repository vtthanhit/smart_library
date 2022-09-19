import {
  ADD_REQUEST,
  REQUESTS_BORROW_LOADED_SUCCESS,
  REQUESTS_BORROW_LOADED_FAIL,
  DELETE_REQUEST,
} from '../contexts/constants';

export const requestReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // case ALL_CATEGORY:
    //   return {
    //     ...state,
    //     categories: payload.categories,
    //   }

    case REQUESTS_BORROW_LOADED_SUCCESS:
      return {
        ...state,
        requests: payload.requests,
        count: payload.count,
        requestsLoading: false,
      }

    case REQUESTS_BORROW_LOADED_FAIL:
      return {
        ...state,
        requests: [],
        requestsLoading: false,
      }

    case ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, payload],
      }

    case DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(request => request._id !== payload)
      }

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
