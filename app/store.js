import reducers from "./reducers";
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from './firebase';

import { Route } from 'react-router'

import { routerMiddleware } from 'react-router-redux';
import history from "./history";

const historyMiddleware = routerMiddleware(history);

const enhancer = compose(
  reactReduxFirebase(firebase, { userProfile: 'users' }),
  applyMiddleware(thunk),
  applyMiddleware(logger),
  applyMiddleware(historyMiddleware),
  persistState(['variations', 'configuration'], {
    deserialize: (json) => {
      let { variations, ...other } = JSON.parse(json);

      for (let variation of variations) {
        variation.amount = Number(variation.amount);
        variation.date = new Date(variation.date);
        variation.spreading = Number(variation.spreading);
      }
      return (
        {
          variations,
          ...other
        }
      );
    }
  })
)

let store = createStore(
  reducers,
  enhancer
);

export default store;