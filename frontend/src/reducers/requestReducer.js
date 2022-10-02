import {
  ADD_REQUEST,
  REQUESTS_BORROW_LOADED_SUCCESS,
  REQUESTS_BORROW_LOADED_FAIL,
  REQUESTS_RETURN_LOADED_SUCCESS,
  REQUESTS_RETURN_LOADED_FAIL,
  DELETE_REQUEST,
  UPDATE_REQUEST,
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

    case REQUESTS_RETURN_LOADED_SUCCESS:
      return {
        ...state,
        requests: payload.requests,
        count: payload.count,
        requestsLoading: false,
      }

    case REQUESTS_RETURN_LOADED_FAIL:
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

    case UPDATE_REQUEST:
      const newRequests = state.requests.map(request =>
        request._id === payload._id ? payload : request
      )

      return {
        ...state,
        requests: newRequests
      }

    default:
      return state;
  }
}
