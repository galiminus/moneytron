import React from 'react';
import MaterialDrawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { deepPurple900 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';

import ByDayIcon from 'material-ui/svg-icons/action/today';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import { connect } from 'react-redux';

import { closeDrawer } from "../actions/drawer";
import translations from "../translations";
import Icon from "../icon.png";

const Drawer = (props) => (
  <MaterialDrawer
    open={props.drawer}
    docked={false}
    onRequestChange={props.closeDrawer}
  >
    <MenuItem
      style={{
        backgroundColor: deepPurple900,
        textAlign: "center"
      }}
      containerElement={<Link to="/variations/day" />}
    >
      <img
        style={{
          height: 128
        }}
        src={Icon}
      />
    </MenuItem>

    <MenuItem
      leftIcon={<ByDayIcon />}
      containerElement={<Link to="/variations/day" />}
    >
      {translations[props.locale].estimate}
    </MenuItem>
    <Divider />
    <MenuItem
      leftIcon={<SettingsIcon />}
      containerElement={<Link to="/settings" />}
    >
      {translations[props.locale].settings}
    </MenuItem>
  </MaterialDrawer>
);

function mapStateToProps(state) {
  return ({
    drawer: state.drawer,
    locale: state.configuration.locale
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeDrawer: () => dispatch(closeDrawer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
