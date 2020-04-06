import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { IntlProvider } from 'react-intl';

import { messages } from './translations';

import App from './components/app/App';

import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './styles.less';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

// const language = navigator.language.split(/[-_]/)[0];  // language without region code
const language = 'en';

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
     <IntlProvider locale={language} messages={messages[language]} defaultLocale="en-gb">
       <App />
     </IntlProvider>
    </Router>
  </Provider>
  , document.getElementById('app')
);
