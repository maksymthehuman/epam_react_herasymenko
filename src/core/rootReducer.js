import { combineReducers } from 'redux';
import { userReducer } from '../features/authorization/reducer';
import { moviesReducer } from '../features/homePage/reducer';
import { actorsReducer } from '../features/actorInfo/reducer';
import { filterReducer } from '../features/homePage/Filter/reducer';

export const rootReducer = combineReducers({
  userReducer,
  moviesReducer,
  actorsReducer,
  filterReducer,
});
