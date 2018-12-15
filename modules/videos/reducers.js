import { GET_VIDEOS, ON_GET_VIDEOS_FAILURE, ON_GET_VIDEOS_SUCCESS } from './actionTypes';

export const videos = (
  state = { data: null, error: null, isLoading: false },
  { type, payload }
) => {
  switch (type) {
    case GET_VIDEOS:
      return {
        ...state,
        isLoading: true
      };
    case ON_GET_VIDEOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload
      };
    case ON_GET_VIDEOS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
};
