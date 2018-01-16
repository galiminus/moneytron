import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { openDrawer } from "../actions/drawer";
import { Desktop, Mobile } from "./devices";

const AppBar = (props) => (
  <MaterialAppBar
    style={{ display: "flex" }}
    title={props.title}
    onLeftIconButtonClick={props.onLeftIconButtonClick || props.openDrawer}
    iconElementLeft={props.iconElementLeft}
    iconElementRight={props.iconElementRight}
    showMenuIconButton={props.showMenuIconButton}
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
