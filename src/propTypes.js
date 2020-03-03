import { PropTypes } from "prop-types";

export const movieShortInfo = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
};

export const movieAdirionalInfo = {
  director: PropTypes.string.isRequired,
  actorsIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
};