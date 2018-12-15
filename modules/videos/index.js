import Videos from './components/Videos';
import * as epics from './epics';
import * as reducers from './reducers';
import { combineReducers } from 'redux';

export const videosEpics = Object.values(epics);

export const videos = combineReducers({
  ...reducers
});

export { Videos };
