import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router'
import VariationForm from './variationForm';
import SettingsForm from './settingsForm';
import VariationList from './variationList';
import Drawer from './drawer';
import Snackbar from './snackbar';
import PageTransition from 'react-router-page-transition';

class Main extends React.Component {
  render() {
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
  }
}

export default withRouter(connect(mapStateToProps, undefined)(Main));
