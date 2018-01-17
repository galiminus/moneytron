import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { openDrawer } from "../actions/drawer";

const AppBar = (props) => (
  <MaterialAppBar
    style={{ position: "fixed", top: 0, width: "100%" }}
    title={props.title}
    onLeftIconButtonClick={props.onLeftIconButtonClick || props.openDrawer}
    iconElementLeft={props.iconElementLeft}
    iconElementRight={props.iconElementRight}
  />
)

function mapStateToProps(state, props) {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(openDrawer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
