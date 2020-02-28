import { PropTypes } from "prop-types";

export const movieShortInfo = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
};

export const movieAdirionalInfo = {
  director: PropTypes.string.isRequired.isRequired,
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
};
