import {
  ADD_USER,
  USERS_LOADED_SUCCESS,
  USERS_LOADED_FAIL,
  DELETE_USER,
  UPDATE_USER,
  ALL_USER,
  FIND_USER,
  USER_LOT,
} from '../contexts/constants';

export const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_USER:
      return {
        ...state,
        users: payload.users,
      }

    case FIND_USER:
      return {
        ...state,
        user: payload.user,
      }

    case USERS_LOADED_SUCCESS:
      return {
        ...state,
        users: payload.users,
        count: payload.count,
        usersLoading: false,
      }

    case USERS_LOADED_FAIL:
      return {
        ...state,
        users: [],
        usersLoading: false,
      }

    case ADD_USER:
      return {
        ...state,
        users: [...state.users, payload],
      }

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload)
      }

    case UPDATE_USER:
      const newUsers = state.users.map(user =>
        user._id === payload._id ? payload : user
      )

      return {
        ...state,
        users: newUsers,
      }

    case USER_LOT:
      return {
        ...state,
        users: payload.users,
        count: payload.count,
        usersLoading: false,
      }

    default:
      return state;
  }
}
