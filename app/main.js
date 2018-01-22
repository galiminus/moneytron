import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepPurple900 } from 'material-ui/styles/colors';

import "moment";
import "moment/locale/fr";

import Main from './components/main';
import { Provider } from 'react-redux';
import { updateConfiguration } from './actions/configuration';
import { setCurrentDate } from "./actions/currentDate";

import { ConnectedRouter } from 'react-router-redux'

import store from "./store";
import history from "./history";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepPurple900,
    primary2Color: deepPurple900,
    pickerHeaderColor: deepPurple900
  }
});

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <ConnectedRouter history={history}>
        <Main />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
);

document.addEventListener("DOMContentLoaded", e => {
  store.dispatch(updateConfiguration({
    currency: "EUR",
    locale: "en-US",
    onboarding: "welcome",
    groupByCategory: false,
    ...(store.getState().configuration || {})
  }));

  ReactDOM.render(
    <App />, document.body.appendChild(document.createElement('div'))
  );

  setInterval(() => (store.dispatch(setCurrentDate(new Date()))), 60 * 1000);
})
