import configuration from "./reducers/configuration";
import loading from "./reducers/loading";
import variations from "./reducers/variations";
import selectedVariation from "./reducers/selectedVariation";
import drawer from "./reducers/drawer";
import message from "./reducers/message";

import { routerReducer } from 'react-router-redux';

import { combineReducers } from "redux";
import { reducer as formReducer, actionTypes as formActionTypes } from 'redux-form';

export default combineReducers({
  configuration,
  loading,
  drawer,
  variations,
  selectedVariation,
  message,
  form: formReducer,
  router: routerReducer
})
