import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/reducers';
import { UpdateTypes, fetchPostingList, updateVisiblePostings, fetchTagsList } from './actions/actions';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer, 
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

//hydrate with server data
store.dispatch(fetchPostingList())
.then(() => store.dispatch(updateVisiblePostings(store.getState().allPostings, UpdateTypes.REPLACE)))
store.dispatch(fetchTagsList())

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
