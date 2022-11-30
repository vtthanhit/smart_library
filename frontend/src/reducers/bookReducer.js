import { 
  ADD_BOOK, 
  BOOKS_LOADED_SUCCESS, 
  BOOKS_LOADED_FAIL, 
  DELETE_BOOK,
  UPDATE_BOOK,
  ALL_BOOK,
  FIND_BOOK,
  FIND_BOOK_SKU,
  BOOK_LOT,
} from '../contexts/constants';

export const bookReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_BOOK:
      return {
        ...state,
        books: payload.books,
      }

    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, payload],
      }

    case BOOKS_LOADED_SUCCESS:
      return {
        ...state,
        books: payload.books,
        count: payload.count,
        booksLoading: false,
      }

    case BOOKS_LOADED_FAIL:
      return {
        ...state,
        books: [],
        booksLoading: false,
      }

    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book._id !== payload)
      }

    case FIND_BOOK:
      return {
        ...state,
        book: payload,
        booksLoading: false,
      }

    case FIND_BOOK_SKU:
      return {
        ...state,
        book: payload,
        booksLoading: false,
      }

    case UPDATE_BOOK:
      const newBooks = state.books.map(book =>
        book._id === payload._id ? payload : book
      )
      return {
        ...state,
        books: newBooks
      }

    case BOOK_LOT: 
      return {
        ...state,
        books: payload.books,
        count: payload.count,
        booksLoading: false,
      }

    default:
      return state;
  }
}