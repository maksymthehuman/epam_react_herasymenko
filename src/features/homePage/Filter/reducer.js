import {
  SEARCH_UPDATED,
  SORT_UPDATED,
  SORT_RESET,
} from './types';

const initialState = {
  searchQuery: '',
  sortType: null,
  sortByAscend: null,
};

const updateSortProperties = (ascend, currentType, newType) => {
  if (currentType !== newType) {
    return {
      sortType: newType,
      sortByAscend: true,
    };
  }

  return {
    sortByAscend: !ascend,
  };
};

export const filterReducer = (state = initialState, action) => {

  switch (action.type) {

    case SEARCH_UPDATED:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case SORT_UPDATED:
      return {
        ...state,
        ...updateSortProperties(state.sortByAscend, state.sortType, action.payload),
      };

    case SORT_RESET:
      return {
        ...state,
        sortType: null,
        sortByAscend: null,
      };

    default:
      return state;
  }
};
