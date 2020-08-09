import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import throttle from 'lodash.throttle';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';

import logger from 'redux-logger';
import rootSaga from './sagas';

let store;
const sagaMiddleware = createSagaMiddleware();

export default (initialState) => {
  const persistedState = loadState();
  store = createStore(rootReducer, persistedState, applyMiddleware(sagaMiddleware,logger));
  sagaMiddleware.run(rootSaga);

    store.subscribe(
      // Throttle: invokes a function at most once per every 1000 milliseconds.
      throttle(() => {
        saveState({
          cart: store.getState().cart
        });
      }, 1000)
  );
  return store;
}
