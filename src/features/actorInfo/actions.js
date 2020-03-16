import {
  ACTOR_LOADED,
  ACTOR_RESET,
  ACTORS_LOADED,
  ACTORS_RESET,
} from './types';

import { API_URLs } from '../../constants';

const currentActorLoaded = (payload) => ({
  type: ACTOR_LOADED,
  payload,
});

export const currentActorReset = () => ({
  type: ACTOR_RESET,
});

const actorsLoaded = (payload) => ({
  type: ACTORS_LOADED,
  payload,
});

export const actorsReset = () => ({
  type: ACTORS_RESET,
});

export const fetchActorById = (id) => (dispatch, _, api) => {
  api(`${API_URLs.ACTORS}/${id}`)
    .then(({ data }) => {
      dispatch(currentActorLoaded(data));
    })
    .catch((error) => console.warn(error));
};

export const fetchActors = () => (dispatch, _, api) => {
  api(API_URLs.ACTORS)
    .then(({ data }) => {
      dispatch(actorsLoaded(data));
    })
    .catch((error) => console.warn(error));
};
