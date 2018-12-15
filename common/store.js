import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { persistReducer, persistStore } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import storage from 'redux-persist/lib/storage';
import { videos, videosEpics } from '../modules/videos';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: hardSet
};

const rootReducer = combineReducers({
  videos
});

const rootEpic = combineEpics(...videosEpics);
const epicMiddleware = createEpicMiddleware();
const store = createStore(
  persistReducer(rootPersistConfig, rootReducer),
  compose(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);
const persistor = persistStore(store);
export default { store, persistor };
