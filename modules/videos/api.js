import axios from 'axios';
import { BASE_URL, VIDEOS } from '../../common/constants';

export const getVideos$$ = () => {
  return axios({
    method: 'GET',
    url: BASE_URL + VIDEOS
  })
    .then(response => response)
    .catch(error => error);
};
