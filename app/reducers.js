import configuration from "./reducers/configuration";
import variations from "./reducers/variations";
import selectedVariation from "./reducers/selectedVariation";
import drawer from "./reducers/drawer";

import { routerReducer } from 'react-router-redux';

import { combineReducers } from "redux";
import { reducer as formReducer, actionTypes as formActionTypes } from 'redux-form';

export default combineReducers({
  configuration,
  drawer,
  variations,
  selectedVariation,
  form: formReducer,
  router: routerReducer
})
