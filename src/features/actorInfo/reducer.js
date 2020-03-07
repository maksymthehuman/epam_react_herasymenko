import {
  ACTOR_LOADED,
  ACTOR_RESET,
  ACTORS_LOADED,
  ACTORS_RESET,
} from './types';

const initialState = {
  actors: null,
  currentActor: null,
};

export const actorsReducer = (state = initialState, action) => {

  switch (action.type) {

    case ACTOR_LOADED:
      return {
        ...state,
        currentActor: action.payload,
      };

    case ACTOR_RESET:
      return {
        ...state,
        currentActor: null,
      };

    case ACTORS_LOADED:
      return {
        ...state,
        actors: action.payload,
      };

    case ACTORS_RESET:
      return {
        ...state,
        actors: null,
      };

    default:
      return state;
  }
};
