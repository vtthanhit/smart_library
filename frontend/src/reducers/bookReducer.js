import { ADD_BOOK } from '../contexts/constants';

export const bookReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, payload],
      }

    default:
      return state;
  }
}