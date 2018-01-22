import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router'

import VariationForm from './variationForm';
import SettingsForm from './settingsForm';
import VariationList from './variationList';
import About from './about';
import Onboarding from './onboarding';
import PageTransition from 'react-router-page-transition';

const Main = (props) => {
  if (props.onboarding !== "done") {
    return (
      <Onboarding />
    )
  } else {
    return (
      <Switch>
        <Route exact path="/" component={VariationList} />
        <Route exact path="/new" component={VariationForm} />
        <Route exact path="/settings" component={SettingsForm} />
        <Route exact path="/about" component={About} />
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    variations: state.variations,
    onboarding: state.configuration.onboarding
  }
}

export default withRouter(connect(mapStateToProps, undefined)(Main));
