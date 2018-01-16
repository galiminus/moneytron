import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router'

import VariationForm from './variationForm';
import SettingsForm from './settingsForm';
import VariationList from './variationList';
import Drawer from './drawer';
import About from './about';
import Onboarding from './onboarding';
import PageTransition from 'react-router-page-transition';
import { Desktop, Mobile } from "./devices";

const Routes = (props) => (
  <Switch>
    <Route exact path="/" component={VariationList} />
    <Route exact path="/variations" component={VariationList} />
    <Route exact path="/variations/new" component={VariationForm} />
    <Route exact path="/variations/:range" component={VariationList} />

    <Route exact path="/settings" component={SettingsForm} />
    <Route exact path="/about" component={About} />
  </Switch>
)

const Main = (props) => {
  if (props.onboarding && false) {
    return (
      <Onboarding />
    )
  } else {
    return (
      <div>
        <Drawer />
        <Desktop>
          <div
            style={{
              position: "absolute",
              left: 256,
              top: 0,
              right: 0,
              bottom: 0
            }}
          >
            <Routes {...props} />
          </div>
        </Desktop>
        <Mobile>
          <Routes {...props} />
        </Mobile>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    onboarding: state.configuration.onboarding
  }
}

export default withRouter(connect(mapStateToProps, undefined)(Main));
