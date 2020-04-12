import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import App from './components/app/App';

import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './styles.less';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(ReduxPromise))(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
       <App />
    </Router>
  </Provider>
  , document.getElementById('app')
);
