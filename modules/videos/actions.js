import { actionCreator } from '../../common/utils';
import { GET_VIDEOS, ON_GET_VIDEOS_FAILURE, ON_GET_VIDEOS_SUCCESS } from './actionTypes';

export const getVideos = actionCreator(GET_VIDEOS);
export const onGetVideosFailure = actionCreator(ON_GET_VIDEOS_FAILURE);
export const onGetVideosSuccess = actionCreator(ON_GET_VIDEOS_SUCCESS);
