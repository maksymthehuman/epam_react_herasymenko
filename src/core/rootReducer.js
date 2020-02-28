import { combineReducers } from 'redux';
import { moviesReducer } from '../features/homePage/reducer';

export const rootReducer = combineReducers({
  moviesReducer
});
