import { combineReducers } from 'redux';
import { moviesReducer } from '../features/homePage/reducer';
import { userReducer } from '../features/authorization/reducer';

export const rootReducer = combineReducers({
  moviesReducer,
  userReducer,
});
