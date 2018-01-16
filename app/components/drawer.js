import React from 'react';
import MaterialDrawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { deepPurple900 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import { closeDrawer } from "../actions/drawer";
import translations from "../translations";
import Icon from "../icon.png";
import { Desktop, Mobile } from "./devices";

const Menu = (props) => (
  <div>
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

    <Subheader>{translations[props.locale].estimate}</Subheader>
    <MenuItem
      containerElement={<Link to="/variations/day" />}
    >
      {translations[props.locale].range["day"]}
    </MenuItem>

    <MenuItem
      containerElement={<Link to="/variations/week" />}
    >
    {translations[props.locale].range["week"]}
    </MenuItem>

    <MenuItem
      containerElement={<Link to="/variations/month" />}
    >
    {translations[props.locale].range["month"]}
    </MenuItem>
    <Divider />
    <MenuItem
      containerElement={<Link to="/settings" />}
    >
      {translations[props.locale].settings}
    </MenuItem>
    <Divider />
    <MenuItem
      containerElement={<Link to="/about" />}
    >
      {translations[props.locale].about}
    </MenuItem>
  </div>
)

const Drawer = (props) => {
  return (
    <div>
      <Desktop>
        <MaterialDrawer
          open={true}
          docked={true}
        >
          <Menu {...props} />
        </MaterialDrawer>
      </Desktop>
      <Mobile>
        <MaterialDrawer
          open={props.drawer}
          docked={false}
          onRequestChange={props.closeDrawer}
        >
          <Menu {...props} />
        </MaterialDrawer>
      </Mobile>
    </div>
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
