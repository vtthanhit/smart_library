import { ADD_CATEGORY } from "../contexts/constants";

export const categoryReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
      }

    default:
      return state;
  }
}
