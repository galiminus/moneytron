import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router'
import { isEmpty, isLoaded } from 'react-redux-firebase'

import VariationForm from './variationForm';
import SettingsForm from './settingsForm';
import VariationList from './variationList';
import Drawer from './drawer';
import Snackbar from './snackbar';
import Login from './login';
import Loading from './loading';
import PageTransition from 'react-router-page-transition';

const Main = ({ firebase }) => {
  if (isEmpty(firebase.auth) && isLoaded(firebase.auth)) {
    return (<Login />);
  } else if (isEmpty(firebase.auth) && !isLoaded(firebase.auth)) {
    return (<Loading />);
  } else {
    return (
      <div>
        <Drawer />
        <Switch>
          <Route exact path="/" component={VariationList} />
          <Route exact path="/variations" component={VariationList} />
          <Route exact path="/settings" component={SettingsForm} />
          <Route exact path="/variations/new" component={VariationForm} />
        </Switch>
        <Snackbar />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    firebase: state.firebase
  }
}

export default withRouter(connect(mapStateToProps, undefined)(Main));
