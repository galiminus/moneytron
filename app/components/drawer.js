import React from 'react';
import MaterialDrawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { deepPurple900 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { closeDrawer } from "../actions/drawer";

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
        Settings
      </MenuItem>
    </MaterialDrawer>
  );
};

function mapStateToProps(state) {
  return ({
    drawer: state.drawer
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeDrawer: () => dispatch(closeDrawer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
