import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { ofType } from 'redux-observable';

import { GET_VIDEOS } from './actionTypes';
import { onGetVideosFailure, onGetVideosSuccess } from './actions';
import { handleResponse } from '../../common/utils';
import { getVideos$$ } from './api';

export const getVideos$ = action$ => {
  return action$.pipe(
    ofType(GET_VIDEOS),
    switchMap(() => {
      return fromPromise(getVideos$$()).pipe(
        tap(console.log),
        map(response => handleResponse(response, onGetVideosSuccess, onGetVideosFailure)),
        catchError(err => of(onGetVideosFailure(err)))
      );
    })
  );
};
