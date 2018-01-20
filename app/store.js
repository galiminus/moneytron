import reducers from "./reducers";
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import persistState from 'redux-localstorage';

import { Route } from 'react-router'

import { routerMiddleware } from 'react-router-redux';
import history from "./history";

const historyMiddleware = routerMiddleware(history);

const enhancer = compose(
  applyMiddleware(logger),
  applyMiddleware(historyMiddleware),
  persistState(['variations', 'configuration', 'drawer', 'form', 'router', 'selectedVariation'], {
    deserialize: (json) => {
      let { variations, currentDate, ...other } = JSON.parse(json);

      for (let variation of variations) {
        variation.amount = Number(variation.amount);
        variation.date = new Date(variation.date);
        variation.spreading = Number(variation.spreading);
      }
      return (
        {
          variations,
          // currentDate: (currentDate ? new Date(currentDate) : new Date()),
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
