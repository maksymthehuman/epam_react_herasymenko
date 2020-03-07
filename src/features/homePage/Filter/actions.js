import {
  SEARCH_UPDATED,
  SORT_UPDATED,
  SORT_RESET,
} from './types';

export const searchApdate = (payload) => ({
  type: SEARCH_UPDATED,
  payload,
});

export const sortApdate = (payload) => ({
  type: SORT_UPDATED,
  payload,
});

export const sortReset = () => ({
  type: SORT_RESET,
});
