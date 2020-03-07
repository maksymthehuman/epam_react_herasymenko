import {
  ACTOR_LOADED,
  ACTOR_RESET,
  ACTORS_LOADED,
  ACTORS_RESET,
} from './types';

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
  api(`actors/${id}`)
    .then(({ data }) => {
      dispatch(currentActorLoaded(data));
    });
};

export const fetchActors = () => (dispatch, _, api) => {
  api('actors')
    .then(({ data }) => {
      dispatch(actorsLoaded(data));
    });
};
