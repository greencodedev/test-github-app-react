import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import dotenv from 'dotenv'

import App from './App';
// import reducer from './reducers';
import reportWebVitals from './reportWebVitals';
import store from './store';

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// const reduceStore = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log("env =>", process.env);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
