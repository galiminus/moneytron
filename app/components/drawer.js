import React from 'react';
import MaterialDrawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { deepPurple900 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';

import { connect } from 'react-redux';

import { closeDrawer } from "../actions/drawer";
import translations from "../translations";

const Drawer = (props) => {
  return (
    <MaterialDrawer
      open={props.drawer}
      docked={false}
      onRequestChange={props.closeDrawer}
    >
      <MenuItem
        style={{
          fontWeight: 800,
          backgroundColor: deepPurple900,
          color: "white",
          paddingBottom: "1em",
          paddingTop: "1em",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontSize: "1.5em"
        }}
      >
        Moneytron
      </MenuItem>
      <MenuItem
        containerElement={<Link to="/settings" />}
      >
        {translations[props.locale].settings}
      </MenuItem>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%"
        }}
      >
        <Divider />
        <MenuItem
          containerElement={<Link to="/about" />}
        >
          {translations[props.locale].about}
        </MenuItem>
      </div>
    </MaterialDrawer>
  );
};

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
