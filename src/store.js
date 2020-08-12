import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash.throttle';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';

import logger from 'redux-logger';
import rootSaga from './sagas';

let store;
const sagaMiddleware = createSagaMiddleware();

export default (initialState) => {
  const persistedState = loadState();

   store = createStore(rootReducer, persistedState, composeWithDevTools(
       applyMiddleware(sagaMiddleware,logger),
      // other store enhancers if any
  ));
  sagaMiddleware.run(rootSaga);

    store.subscribe(
      // Throttle: invokes a function at most once per every 1000 milliseconds.
      throttle(() => {
        saveState({
          cart: store.getState().cart,
          currency: store.getState().currency
        });
      }, 1000)
  );
  return store;
}
